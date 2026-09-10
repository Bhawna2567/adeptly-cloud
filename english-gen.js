/* Adeptly — English generator engine (ENG_GEN).
   Self-contained, deterministic-by-seed procedural generator so every diagnostic produces a
   TOTALLY different English paper (reading passage + comprehension, grammar, vocabulary, writing
   prompt) with effectively no repetition. No external AI/API needed — works offline.

   Public API (all seeded by a string so results are reproducible for the same seed):
     ENG_GEN.items(grade, seedStr, count)  -> array of Grammar/Vocabulary MCQs {q,options,answer,skill,level,sub}
     ENG_GEN.reading(grade, seedStr)        -> {title, passage, qs:[{q,options,answer}]}
     ENG_GEN.writing(grade, seedStr)        -> writing-prompt string

   Grade bands: A (<=4), B (5-6), C (7-9), D (10-12).  Load AFTER curriculum.js, BEFORE the app
   uses it (call time only). */
(function(){
  // ---- seeded RNG (mulberry/xorshift from a string hash) ----
  function hashStr(s){ s=String(s); var h=1779033703^s.length; for(var i=0;i<s.length;i++){ h=Math.imul(h^s.charCodeAt(i),3432918353); h=(h<<13)|(h>>>19); } return h>>>0; }
  function rng(seed){ var s=hashStr(seed)||123456789; return function(){ s^=s<<13; s>>>=0; s^=s>>>17; s^=s<<5; s>>>=0; return s/4294967296; }; }
  function ri(r,a,b){ return a+Math.floor(r()*(b-a+1)); }
  function pick(r,arr){ return arr[Math.floor(r()*arr.length)]; }
  function shuffle(r,arr){ arr=arr.slice(); for(var i=arr.length-1;i>0;i--){ var j=Math.floor(r()*(i+1)),t=arr[i];arr[i]=arr[j];arr[j]=t; } return arr; }
  function bandOf(grade){ var n=parseInt(String(grade),10)||6; return n<=4?1:n<=6?2:n<=9?3:4; }
  function cap(s){ s=String(s); return s.charAt(0).toUpperCase()+s.slice(1); }
  // Distinct distractors from a pool, excluding the answer (and any provided excludes).
  function distinct(r,pool,answer,n,extraExclude){
    var ex={}; ex[String(answer).toLowerCase()]=1; (extraExclude||[]).forEach(function(e){ex[String(e).toLowerCase()]=1;});
    var out=[], tries=0, sh=shuffle(r,pool);
    for(var i=0;i<sh.length&&out.length<n;i++){ var v=sh[i]; var k=String(v).toLowerCase(); if(ex[k])continue; ex[k]=1; out.push(v); }
    while(out.length<n){ out.push("none of these"+(out.length? " ("+out.length+")":"")); }
    return out;
  }
  // Build an MCQ with a correct answer + distractor list; options shuffled; returns item.
  // Guarantees FOUR DISTINCT options (case-insensitive) with the correct answer present —
  // dedupes distractors (some inflected forms coincide, e.g. read/read) and backfills if short.
  var MC_FILL=["none of these","no change is needed","not sure","cannot say"];
  function mc(r,skill,level,sub,q,correct,distractors){
    var seen={}; seen[String(correct).toLowerCase()]=1; var ds=[];
    shuffle(r,distractors||[]).forEach(function(d){ if(d==null)return; var k=String(d).toLowerCase(); if(!seen[k]){ seen[k]=1; ds.push(d); } });
    var fi=0; while(ds.length<3 && fi<MC_FILL.length){ var f=MC_FILL[fi++]; if(!seen[f.toLowerCase()]){ seen[f.toLowerCase()]=1; ds.push(f); } }
    var opts=shuffle(r,[correct].concat(ds.slice(0,3)));
    var answer=opts.indexOf(correct);
    if(answer<0){ opts[0]=correct; answer=0; }
    return {q:q,options:opts,answer:answer,skill:skill,level:level,sub:sub};
  }

  /* ===================== WORD BANKS ===================== */
  var SUBJ=["He","She","The teacher","My friend","The old man","Ali","Sara","The little boy","The girl","Our neighbour","The scientist","The player"];
  var TIME_NOW=["right now","at the moment","this minute","today"];
  var TIME_PAST=["yesterday","last week","an hour ago","last night","two days ago","last summer"];
  var TIME_HABIT=["every day","each morning","on Sundays","twice a week","every evening"];
  // base, third, ing, past, participle
  var VERBS=[
    ["go","goes","going","went","gone"],["eat","eats","eating","ate","eaten"],
    ["write","writes","writing","wrote","written"],["play","plays","playing","played","played"],
    ["study","studies","studying","studied","studied"],["run","runs","running","ran","run"],
    ["take","takes","taking","took","taken"],["make","makes","making","made","made"],
    ["buy","buys","buying","bought","bought"],["see","sees","seeing","saw","seen"],
    ["speak","speaks","speaking","spoke","spoken"],["drink","drinks","drinking","drank","drunk"],
    ["begin","begins","beginning","began","begun"],["drive","drives","driving","drove","driven"],
    ["give","gives","giving","gave","given"],["sing","sings","singing","sang","sung"],
    ["swim","swims","swimming","swam","swum"],["catch","catches","catching","caught","caught"],
    ["teach","teaches","teaching","taught","taught"],["build","builds","building","built","built"]
  ];
  var OBJ=["a book","the ball","some water","a letter","the song","dinner","a picture","the car","a story","the game","a cake","the news"];
  var AN=["apple","elephant","umbrella","orange","egg","idea","island","animal","envelope","uncle","hour","onion"];
  var A=["book","car","dog","table","pen","house","ball","cat","tree","phone","bicycle","teacher"];
  var IRREG_PLURAL=[["child","children"],["man","men"],["woman","women"],["foot","feet"],["tooth","teeth"],["mouse","mice"],["person","people"],["leaf","leaves"],["knife","knives"],["goose","geese"],["half","halves"],["life","lives"],["wolf","wolves"],["cactus","cacti"]];
  var PREP_COLLOC=[["good","at"],["interested","in"],["afraid","of"],["listen","to"],["depend","on"],["arrive","at"],["married","to"],["famous","for"],["proud","of"],["full","of"],["similar","to"],["responsible","for"],["belong","to"],["succeed","in"],["apologise","for"]];
  var PREPS=["at","in","of","to","on","for","with","from","about"];
  var COMPAR=[["big","bigger"],["happy","happier"],["good","better"],["bad","worse"],["easy","easier"],["hot","hotter"],["tall","taller"],["heavy","heavier"],["fast","faster"],["cold","colder"],["strong","stronger"],["large","larger"],["small","smaller"],["long","longer"]];
  var COMPAR_MORE=[["expensive","more expensive"],["beautiful","more beautiful"],["difficult","more difficult"],["interesting","more interesting"],["important","more important"],["careful","more careful"]];
  var POSS=[["Sara","her"],["Ali","his"],["the children","their"],["the team","its"],["my brother","his"],["my sister","her"],["the students","their"],["the cat","its"]];
  var SYN=[
    ["happy",["glad","joyful","pleased","cheerful"]],["sad",["unhappy","miserable","gloomy"]],["big",["large","huge","enormous"]],
    ["small",["little","tiny","minute"]],["fast",["quick","rapid","swift"]],["smart",["clever","intelligent","bright"]],
    ["begin",["start","commence"]],["end",["finish","conclude"]],["help",["assist","aid"]],["make",["create","produce"]],
    ["buy",["purchase"]],["strong",["powerful","mighty"]],["scared",["afraid","frightened","terrified"]],["angry",["furious","mad"]],
    ["quiet",["silent","calm"]],["famous",["well-known","renowned"]],["rich",["wealthy","affluent"]],["brave",["courageous","fearless"]],
    ["easy",["simple","effortless"]],["hard",["difficult","tough"]],["beautiful",["pretty","lovely","gorgeous"]],["important",["significant","crucial"]],
    ["answer",["reply","respond"]],["choose",["select","pick"]],["show",["display","reveal"]],["enough",["sufficient","ample"]],
    ["ancient",["old","aged"]],["tired",["exhausted","weary"]],["cold",["chilly","freezing"]],["clever",["smart","sharp"]],
    ["huge",["enormous","gigantic","vast"]],["tiny",["minuscule","microscopic"]],["fix",["repair","mend"]],["begin",["start"]]
  ];
  var ANT=[
    ["happy","sad"],["big","small"],["fast","slow"],["hot","cold"],["up","down"],["open","closed"],["full","empty"],
    ["day","night"],["buy","sell"],["begin","end"],["easy","hard"],["rich","poor"],["young","old"],["love","hate"],
    ["win","lose"],["true","false"],["light","dark"],["wet","dry"],["early","late"],["strong","weak"],["accept","reject"],
    ["expand","shrink"],["ancient","modern"],["generous","selfish"],["brave","cowardly"],["increase","decrease"],["arrive","depart"],
    ["ascend","descend"],["temporary","permanent"],["visible","invisible"],["victory","defeat"]
  ];
  var DEFWORD=[
    ["a doctor for animals","vet"],["a person who flies planes","pilot"],["a place where books are kept","library"],
    ["someone who teaches","teacher"],["a person who cooks in a restaurant","chef"],["the season after winter","spring"],
    ["a baby dog","puppy"],["a baby cat","kitten"],["a shape with three sides","triangle"],["a person who writes books","author"],
    ["a doctor for teeth","dentist"],["a place to see wild animals","zoo"],["the study of living things","biology"],
    ["someone who plays music","musician"],["happening once a year","annual"],["not able to be seen","invisible"],
    ["a person who paints pictures","painter"],["a place where you borrow money","bank"],["a doctor's helper","nurse"],
    ["the study of the past","history"],["a person who fixes cars","mechanic"],["someone who explores space","astronaut"]
  ];
  var CONTEXT=[
    ["The room was so ___ that we needed lamps.","dark",["bright","noisy","warm"]],
    ["After running for an hour, she felt completely ___.","exhausted",["fresh","hungry","calm"]],
    ["The soup was too ___, so I added water.","salty",["sweet","cold","empty"]],
    ["He spoke in a ___ voice so the baby would not wake.","quiet",["loud","angry","fast"]],
    ["The old bridge was ___ and unsafe to cross.","weak",["strong","new","wide"]],
    ["Because it was ___, we cancelled the picnic.","raining",["sunny","calm","early"]],
    ["The film was so ___ that I fell asleep.","boring",["exciting","short","funny"]],
    ["She gave a ___ answer that explained everything clearly.","clear",["confusing","short","rude"]],
    ["The mountain path was steep and ___ to climb.","difficult",["easy","flat","short"]],
    ["The museum was ___ with visitors on the holiday.","crowded",["empty","dark","quiet"]]
  ];
  var PREFIX=[["un- (unhappy)","not"],["-less (careless)","without"],["re- (redo)","again"],["mis- (misread)","wrongly"],["pre- (preview)","before"],["over- (overeat)","too much"],["under- (underpaid)","too little"],["dis- (disagree)","not / opposite"],["-ful (helpful)","full of"],["bi- (bicycle)","two"]];

  var PUNCT=[
    ["Choose the correctly punctuated sentence.","My brother's car is red.",["My brothers car is red.","My brother's car is red","my brother's car is red."]],
    ["Choose the correctly punctuated sentence.","“Where are you going?” she asked.",["“Where are you going” she asked.","“Where are you going?” she asked","Where are you going? she asked."]],
    ["Choose the correctly punctuated sentence.","We bought apples, oranges, and pears.",["We bought apples oranges and pears.","We bought, apples, oranges and pears.","We bought apples, oranges and pears"]],
    ["Choose the correctly punctuated sentence.","It's raining, so take an umbrella.",["Its raining, so take an umbrella.","It's raining so take an umbrella","Its' raining, so take an umbrella."]],
    ["Choose the correctly punctuated sentence.","The dogs wagged their tails.",["The dog's wagged their tails.","The dogs wagged there tails.","The dogs' wagged their tails."]],
    ["Choose the correctly punctuated sentence.","Yes, I would love to come.",["Yes I would love to come.","Yes, I would love to come","yes, I would love to come."]]
  ];
  var CONDS=[
    ["If you heat ice, it ___.","melts",["will melt","melted","would melt"]],
    ["If it rains tomorrow, we ___ at home.","will stay",["stay","stayed","would stay"]],
    ["If I ___ rich, I would travel the world.","were",["am","will be","have been"]],
    ["If she had studied, she ___ the exam.","would have passed",["will pass","passes","passed"]],
    ["Water boils if you ___ it to 100°C.","heat",["will heat","heated","would heat"]]
  ];
  var MODALS=[
    ["You ___ wear a seatbelt; it is the law.","must",["can","might","would"]],
    ["She ___ swim when she was three years old.","could",["must","should","would"]],
    ["You ___ smoke here; it is not allowed.","must not",["need not","could not","would not"]],
    ["It ___ rain later, so take a coat just in case.","might",["must","should","will definitely"]],
    ["You ___ see a doctor if the pain continues.","should",["must not","could not","need not"]]
  ];
  var REPORTED=[
    ["He said he ___ tired.","was",["is","will be","has been"]],
    ["She told me she ___ come to the party.","would",["will","can","shall"]],
    ["They said they ___ finished the work.","had",["have","has","will have"]]
  ];
  var PASSIVE=[
    ["The window ___ by the storm.","was broken",["broke","is breaking","has broke"]],
    ["This bridge ___ in 1990.","was built",["built","is building","has building"]],
    ["The letters ___ every morning.","are delivered",["deliver","is delivered","delivering"]]
  ];
  var HOMOPHONE=[
    ["Choose the correct word: ___ going to be late.","They're",["Their","There","Theyre"]],
    ["Choose the correct word: ___ book is on the table.","Their",["They're","There","Thier"]],
    ["Choose the correct word: The cat hurt ___ paw.","its",["it's","its'","it is"]],
    ["Choose the correct word: ___ coming to the party?","You're",["Your","Youre","Yours"]],
    ["Choose the correct word: I can't hear you over ___.","there",["their","they're","thier"]]
  ];

  /* ===================== GRAMMAR TEMPLATES ===================== */
  // Each template: {b:minBand, lv:level, fn:function(r){...item}}
  var GRAMMAR=[
    {b:1,lv:"F",fn:function(r){ var s=pick(r,SUBJ),v=pick(r,VERBS),t=pick(r,TIME_HABIT); return mc(r,"Grammar","F","present simple",s+" ___ "+pick(r,OBJ)+" "+t+".",v[1],[v[0],v[2],v[3],v[4]]); }},
    {b:1,lv:"F",fn:function(r){ var vowel=r()<0.5, n=vowel?pick(r,AN):pick(r,A), corr=vowel?"an":"a"; return mc(r,"Grammar","F","articles","I saw ___ "+n+" in the park.",corr,[vowel?"a":"an","the","some"]); }},
    {b:1,lv:"F",fn:function(r){ var p=pick(r,POSS); return mc(r,"Grammar","F","pronouns",p[0]+" forgot ___ umbrella at school.",p[1],shuffle(r,["his","her","their","its"]).filter(function(x){return x!==p[1];}).slice(0,3)); }},
    {b:2,lv:"C",fn:function(r){ var s=pick(r,SUBJ),v=pick(r,VERBS),t=pick(r,TIME_PAST); return mc(r,"Grammar","C","past simple",cap(t)+", "+s.toLowerCase()+" ___ "+pick(r,OBJ)+".",v[3],[v[0],v[1],v[2],v[4]]); }},
    {b:2,lv:"C",fn:function(r){ var v=pick(r,VERBS); return mc(r,"Grammar","C","present continuous","Look! The baby ___ "+v[2].replace(/ing$/,"ing")+" now.","is "+v[2],[v[1],v[3],"are "+v[2]]); }},
    {b:2,lv:"C",fn:function(r){ var p=pick(r,IRREG_PLURAL); return mc(r,"Grammar","C","plurals","One "+p[0]+", two ___.",p[1],[p[0]+"s",p[0]+"es",p[0]]); }},
    {b:2,lv:"C",fn:function(r){ var c=pick(r,PREP_COLLOC); return mc(r,"Grammar","C","prepositions","She is very "+c[0]+" ___ maths.",c[1],distinct(r,PREPS,c[1],3)); }},
    {b:2,lv:"C",fn:function(r){ var c=pick(r,COMPAR); return mc(r,"Grammar","C","comparatives","This one is ___ than that one.",c[1],[c[0],c[0]+"est","most "+c[0]]); }},
    {b:3,lv:"C",fn:function(r){ var c=pick(r,COMPAR_MORE); return mc(r,"Grammar","C","comparatives","This phone is ___ than mine.",c[1],[c[0],c[0]+"er",c[0]+"est"]); }},
    {b:1,lv:"F",fn:function(r){ var pairs=[["Do","she live near you?","Does"],["Does","you like tea?","Do"],["Are","they coming with us?","Are"]]; var it=pick(r,[["Does she live near you?","Does",["Do","Is","Has"]],["Do you like tea?","Do",["Does","Are","Have"]],["Are they coming with us?","Are",["Is","Do","Have"]],["Has he finished his homework?","Has",["Have","Is","Does"]]]); var q=it[0]; var head=q.split(" ")[0]; return mc(r,"Grammar","F","questions & auxiliaries","___ "+q.slice(head.length+1),it[1],it[2]); }},
    {b:2,lv:"C",fn:function(r){ var it=pick(r,[["It was raining, ___ we stayed home.","so",["but","or","because"]],["I like tea ___ coffee.","and",["but","so","or"]],["He is rich ___ unhappy.","but",["and","so","or"]],["Hurry up, ___ you'll miss the bus.","or",["and","but","so"]],["She was late ___ the traffic was bad.","because",["but","or","although"]]]); return mc(r,"Grammar","C","conjunctions",it[0],it[1],it[2]); }},
    {b:3,lv:"H",fn:function(r){ var it=pick(r,[["One of my friends ___ a doctor.","is",["are","am","be"]],["The list of items ___ on the desk.","is",["are","were","have"]],["Each of the students ___ a book.","has",["have","are","having"]],["Neither answer ___ correct.","is",["are","were","being"]],["Everybody ___ ready to start.","is",["are","were","have"]]]); return mc(r,"Grammar","H","subject–verb agreement",it[0],it[1],it[2]); }},
    {b:2,lv:"C",fn:function(r){ var it=pick(r,PUNCT); return mc(r,"Grammar","C","punctuation",it[0],it[1],it[2]); }},
    {b:3,lv:"H",fn:function(r){ var it=pick(r,CONDS); return mc(r,"Grammar","H","conditionals",it[0],it[1],it[2]); }},
    {b:2,lv:"C",fn:function(r){ var it=pick(r,MODALS); return mc(r,"Grammar","C","modal verbs",it[0],it[1],it[2]); }},
    {b:4,lv:"H",fn:function(r){ var it=pick(r,REPORTED); return mc(r,"Grammar","H","reported speech",it[0],it[1],it[2]); }},
    {b:4,lv:"H",fn:function(r){ var it=pick(r,PASSIVE); return mc(r,"Grammar","H","passive voice",it[0],it[1],it[2]); }},
    {b:2,lv:"C",fn:function(r){ var it=pick(r,HOMOPHONE); return mc(r,"Grammar","C","homophones",it[0],it[1],it[2]); }},
    {b:3,lv:"H",fn:function(r){ var v=pick(r,VERBS); return mc(r,"Grammar","H","present perfect","I have never ___ that before.",v[4],[v[3],v[1],v[2],v[0]]); }}
  ];

  /* ===================== VOCABULARY TEMPLATES ===================== */
  var VOCAB_DISTRACT=["river","table","bright","travel","garden","silence","yellow","market","window","forest","letter","engine","summer","branch","pocket","planet","corner","ticket","bottle","candle"];
  var VOCAB=[
    {b:1,lv:"F",fn:function(r){ var it=pick(r,SYN); var syn=pick(r,it[1]); return mc(r,"Vocabulary","F","synonyms","Which word means the SAME as “"+it[0]+"”?",syn,distinct(r,VOCAB_DISTRACT,syn,3,it[1].concat([it[0]]))); }},
    {b:1,lv:"F",fn:function(r){ var it=pick(r,ANT); var dir=r()<0.5; var w=dir?it[0]:it[1], ans=dir?it[1]:it[0]; return mc(r,"Vocabulary","F","antonyms","Which is the OPPOSITE of “"+w+"”?",ans,distinct(r,VOCAB_DISTRACT,ans,3,[w])); }},
    {b:2,lv:"C",fn:function(r){ var it=pick(r,DEFWORD); return mc(r,"Vocabulary","C","definitions","Which word means “"+it[0]+"”?",it[1],distinct(r,DEFWORD.map(function(x){return x[1];}),it[1],3)); }},
    {b:2,lv:"C",fn:function(r){ var it=pick(r,CONTEXT); return mc(r,"Vocabulary","C","word in context",it[0],it[1],it[2]); }},
    {b:3,lv:"H",fn:function(r){ var it=pick(r,SYN.filter(function(x){return x[0].length>=6;})); if(!it) it=pick(r,SYN); var syn=pick(r,it[1]); return mc(r,"Vocabulary","H","synonyms","Choose the closest in meaning to “"+it[0]+"”.",syn,distinct(r,VOCAB_DISTRACT,syn,3,it[1].concat([it[0]]))); }},
    {b:4,lv:"H",fn:function(r){ var it=pick(r,PREFIX); return mc(r,"Vocabulary","H","prefixes & suffixes","The affix in “"+it[0]+"” means:",it[1],distinct(r,["again","not","before","after","without","too much","too little","full of","two","half"],it[1],3)); }}
  ];

  /* ===================== READING: narrative builder (bands A/B) ===================== */
  var NAMES=["Layla","Omar","Maya","Yousef","Hana","Zaid","Noor","Adam","Sofia","Khalid","Mariam","Tariq","Lina","Sami","Dana","Faris"];
  var PLACES=["the beach","the old market","the school library","her grandmother's farm","the science museum","a busy train station","the mountain village","the city park","the harbour","the desert camp"];
  var GOALS=["find a lost puppy","win the drawing contest","finish reading a long book","plant a small garden","learn to ride a bicycle","build a model boat","help clean the beach","bake a cake for a friend"];
  var PROBLEMS=["a sudden heavy rain started","the road was blocked","she had forgotten her bag","it was getting dark","the shop had already closed","a strong wind blew everything away","nobody was there to help"];
  var ACTIONS=["ask a kind stranger for help","try again a different way","share the work with a friend","stay calm and make a plan","use what she already had","wait patiently for the rain to stop"];
  var RESULTS=["everything worked out well","she reached her goal just in time","she learned something important","her friends thanked her warmly","the day ended with a big smile"];
  var FEELINGS=[["proud","pleased"],["relieved","glad"],["excited","thrilled"],["grateful","thankful"],["confident","sure"]];
  function buildNarrative(r,band){
    var name=pick(r,NAMES), place=pick(r,PLACES), goal=pick(r,GOALS), problem=pick(r,PROBLEMS), action=pick(r,ACTIONS), result=pick(r,RESULTS), feel=pick(r,FEELINGS);
    var day=pick(r,["one sunny morning","one quiet afternoon","early one Saturday","one cloudy day"]);
    var passage=name+" went to "+place+" "+day+". "+name+" wanted to "+goal+". "+
      "At first it seemed easy, but then there was a problem: "+problem+". "+
      name+" decided to "+action+". It was not simple, and "+name+" had to keep trying. "+
      "In the end, "+result+", and "+name+" felt very "+feel[0]+".";
    var qs=[];
    qs.push(mc(r,"Reading","F","detail","Where did "+name+" go?",place,distinct(r,PLACES,place,3)));
    qs.push(mc(r,"Reading","F","detail","What did "+name+" want to do?",goal,distinct(r,GOALS,goal,3)));
    qs.push(mc(r,"Reading","C","detail","What was the problem?",problem,distinct(r,PROBLEMS,problem,3)));
    qs.push(mc(r,"Reading","C","detail","What did "+name+" decide to do?",action,distinct(r,ACTIONS,action,3)));
    qs.push(mc(r,"Reading","F","detail","How did "+name+" feel at the end?",feel[0],distinct(r,["angry","bored","afraid","tired","jealous","confused"],feel[0],3)));
    qs.push(mc(r,"Reading","H","main idea","What is the main lesson of the story?","Keep trying and you can solve problems.",["Never leave your home.","Friends are not important.","Plans always fail."]));
    qs.push(mc(r,"Reading","C","vocabulary","The word “"+feel[0]+"” most nearly means:",feel[1],distinct(r,["worried","hungry","noisy","lazy"],feel[1],3)));
    return {title:pick(r,["A Day to Remember","Never Give Up","The Big Try","A Small Adventure","The Helpful Plan"]), passage:passage, qs:band<=1?qs.slice(0,5):qs.slice(0,6)};
  }

  /* ===================== READING: factual builder (bands C/D) ===================== */
  // Topic packs: {name, category, habitat/where, fact1, fact2, threat/why, vocabWord, vocabSyn}
  var FACT_PACKS=[
    {subj:"the Arctic fox",where:"the freezing Arctic tundra",f1:"has a thick white coat that keeps it warm and hides it in the snow",f2:"eats small animals and berries when food is scarce",extra:"can survive temperatures far below zero",vocab:["scarce","rare"]},
    {subj:"the honeybee",where:"hives built from wax",f1:"collects nectar from flowers to make honey",f2:"communicates the location of food through a special “waggle” dance",extra:"pollinates many of the crops people eat",vocab:["pollinates","fertilises"]},
    {subj:"the Nile River",where:"north-eastern Africa",f1:"is one of the longest rivers in the world",f2:"provided water and rich soil for ancient Egyptian farming",extra:"still supports millions of people today",vocab:["rich","fertile"]},
    {subj:"the printing press",where:"15th-century Europe",f1:"allowed books to be copied quickly and cheaply",f2:"helped spread new ideas to ordinary people",extra:"is seen as one of history's most important inventions",vocab:["spread","circulate"]},
    {subj:"the rainforest",where:"warm regions near the equator",f1:"is home to more than half of the world's plant and animal species",f2:"produces a large share of the oxygen we breathe",extra:"is threatened by logging and farming",vocab:["threatened","endangered"]},
    {subj:"the camel",where:"hot, dry deserts",f1:"stores fat in its hump to use when food is hard to find",f2:"can go many days without drinking water",extra:"has long eyelashes that keep sand out of its eyes",vocab:["store","keep"]},
    {subj:"solar power",where:"anywhere with sunlight",f1:"turns energy from the sun into electricity",f2:"produces no smoke or harmful gases while working",extra:"is becoming cheaper and more common worldwide",vocab:["harmful","damaging"]},
    {subj:"the octopus",where:"oceans around the world",f1:"can change the colour of its skin to hide from danger",f2:"is considered one of the most intelligent sea creatures",extra:"can squeeze through tiny gaps because it has no bones",vocab:["intelligent","clever"]},
    {subj:"the Great Wall of China",where:"northern China",f1:"was built over many centuries to defend the land",f2:"stretches for thousands of kilometres across hills and deserts",extra:"is one of the most famous structures ever made by people",vocab:["defend","protect"]},
    {subj:"the water cycle",where:"the Earth's atmosphere and surface",f1:"moves water between the sea, the sky and the land",f2:"includes evaporation, condensation and rainfall",extra:"provides the fresh water that living things need",vocab:["fresh","clean"]},
    {subj:"the elephant",where:"the grasslands and forests of Africa and Asia",f1:"uses its long trunk to gather food and drink water",f2:"lives in family groups led by the oldest female",extra:"has an excellent memory and can recognise old friends",vocab:["recognise","identify"]},
    {subj:"recycling",where:"homes, schools and factories",f1:"turns used materials into new products",f2:"saves energy and reduces the waste sent to landfills",extra:"helps protect natural resources for the future",vocab:["reduces","lowers"]},
    {subj:"the penguin",where:"the icy coasts of the southern hemisphere",f1:"is a bird that cannot fly but swims expertly",f2:"huddles together in large groups to stay warm",extra:"can dive deep to catch fish",vocab:["expertly","skilfully"]},
    {subj:"the volcano",where:"weak points in the Earth's crust",f1:"forms when melted rock rises from deep underground",f2:"can create new land when its lava cools and hardens",extra:"is carefully monitored by scientists to warn people",vocab:["monitored","observed"]},
    {subj:"the internet",where:"computers connected across the world",f1:"lets people share information almost instantly",f2:"has changed how we learn, work and communicate",extra:"depends on vast networks of cables and servers",vocab:["vast","enormous"]},
    {subj:"the coral reef",where:"warm, shallow tropical seas",f1:"is built by tiny animals called polyps over many years",f2:"shelters a quarter of all ocean species",extra:"is fragile and easily damaged by warming water",vocab:["fragile","delicate"]},
    {subj:"the bicycle",where:"roads and paths everywhere",f1:"is a simple machine powered entirely by the rider",f2:"produces no pollution and keeps people healthy",extra:"remains one of the most efficient ways to travel short distances",vocab:["efficient","effective"]},
    {subj:"the human brain",where:"inside the skull",f1:"controls everything the body does, from breathing to thinking",f2:"contains billions of connected nerve cells",extra:"can adapt and learn throughout a person's life",vocab:["adapt","adjust"]},
    {subj:"the dolphin",where:"seas and oceans worldwide",f1:"uses sound to find food and to talk to other dolphins",f2:"is playful and often works together in groups to hunt",extra:"is regarded as one of the most intelligent animals",vocab:["regarded","considered"]},
    {subj:"the pyramid of Giza",where:"the edge of the Egyptian desert",f1:"was built as a tomb for a powerful king",f2:"is made of millions of huge stone blocks",extra:"has stood for more than four thousand years",vocab:["huge","massive"]},
    {subj:"the wind turbine",where:"open, windy areas and coastlines",f1:"captures the wind's energy with its spinning blades",f2:"generates clean electricity without burning fuel",extra:"can be grouped into large 'wind farms'",vocab:["generates","produces"]},
    {subj:"the desert",where:"regions that receive very little rain",f1:"can be scorching by day and freezing by night",f2:"is home to plants and animals that survive with little water",extra:"covers about a fifth of the Earth's land",vocab:["scorching","boiling"]},
    {subj:"the library",where:"towns, schools and universities",f1:"stores books and other resources for everyone to use",f2:"offers a quiet space to study and discover new ideas",extra:"increasingly lends digital books and online tools too",vocab:["discover","find"]},
    {subj:"the butterfly",where:"gardens, meadows and forests",f1:"begins life as a caterpillar before transforming completely",f2:"helps pollinate flowers as it feeds on nectar",extra:"can travel remarkable distances when it migrates",vocab:["remarkable","extraordinary"]}
  ];
  // Opinion/argument builder (band D) for persuasive-style comprehension.
  var ARG_TOPICS=[
    {claim:"schools should start later in the morning",for1:"teenagers need more sleep to concentrate",for2:"studies link later starts to better grades",against:"it could clash with parents' work schedules"},
    {claim:"single-use plastic should be banned",for1:"it pollutes oceans and harms wildlife",for2:"reusable options already exist",against:"some argue it raises costs for shops"},
    {claim:"students should learn coding at school",for1:"digital skills are useful in many jobs",for2:"it builds logical thinking",against:"critics say the timetable is already full"},
    {claim:"cities should build more cycle lanes",for1:"cycling reduces traffic and pollution",for2:"it improves people's health",against:"opponents worry about the cost and road space"},
    {claim:"homework should be optional",for1:"students could learn at their own pace",for2:"it might reduce stress and burnout",against:"teachers say practice at home reinforces learning"},
    {claim:"public libraries should stay free forever",for1:"they give everyone equal access to knowledge",for2:"they support students who cannot buy books",against:"some argue they are expensive to maintain"},
    {claim:"schools should grow their own vegetables",for1:"students would learn where food comes from",for2:"it encourages healthier eating",against:"critics say it takes time away from other subjects"},
    {claim:"advertising aimed at children should be limited",for1:"young children cannot always judge claims critically",for2:"it can encourage unhealthy demands",against:"businesses argue it restricts fair competition"},
    {claim:"exams should be replaced by projects",for1:"projects test deeper, real-world understanding",for2:"they reduce the pressure of a single test day",against:"others say exams are fairer and harder to copy"},
    {claim:"every student should learn a musical instrument",for1:"music has been linked to better memory and focus",for2:"it builds patience and teamwork",against:"some point out that instruments and lessons cost money"}
  ];
  function buildFactual(r,band){
    if(band>=4 && r()<0.4){
      var t=pick(r,ARG_TOPICS);
      var passage="There is an ongoing debate about whether "+t.claim+". Supporters make two main points. First, "+t.for1+". Second, "+t.for2+". Critics, however, raise a concern: "+t.against+". Most people agree the issue is not simple, and that any decision should weigh the benefits against the practical difficulties before it is made.";
      var qs=[];
      qs.push(mc(r,"Reading","C","main idea","What is the passage mainly about?","A debate about whether "+t.claim,["A description of a single school","A personal diary entry","A set of cooking instructions"]));
      qs.push(mc(r,"Reading","C","detail","Which is one argument IN FAVOUR?",cap(t.for1)+".",[cap(t.against)+".","The topic is boring.","Nobody has an opinion."]));
      qs.push(mc(r,"Reading","H","detail","What concern do critics raise?",cap(t.against)+".",[cap(t.for1)+".",cap(t.for2)+".","That the claim is certainly true."]));
      qs.push(mc(r,"Reading","H","inference","What can we infer about the writer's view?","The issue has valid points on both sides.",["Supporters are always wrong.","Critics are always right.","The decision is very easy."]));
      qs.push(mc(r,"Reading","H","tone","The tone of the passage is best described as:","balanced and analytical",["angry and biased","funny and light","fearful and panicked"]));
      qs.push(mc(r,"Reading","C","author purpose","Why did the author write this?","To present different sides of a debate",["To sell a product","To tell a bedtime story","To give a recipe"]));
      return {title:"A Question Worth Debating", passage:passage, qs:qs};
    }
    var p=pick(r,FACT_PACKS);
    // Vary the opening, the connectors and the closing so the SAME topic reads differently each time.
    var open=pick(r,[
      cap(p.subj)+" is found in "+p.where+".",
      cap(p.subj)+" can be found in "+p.where+", and it is well worth knowing about.",
      "Many people are curious about "+p.subj+", which lives in "+p.where+".",
      "In "+p.where+", "+p.subj+" plays an interesting role."
    ]);
    var c1=pick(r,["It ","Firstly, it ","To begin with, it ","Notably, it "]);
    var c2=pick(r,["It also ","In addition, it ","Furthermore, it ","What is more, it "]);
    var c3=pick(r,["On top of this, it ","Beyond that, it ","Interestingly, it ","Remarkably, it "]);
    var close=pick(r,[
      "For these reasons, "+p.subj+" is often studied and admired by people around the world.",
      "Because of all this, "+p.subj+" continues to fascinate scientists and students alike.",
      "This is why "+p.subj+" is considered so important.",
      "Little wonder, then, that "+p.subj+" attracts so much attention."
    ]);
    var passage=open+" "+c1+p.f1+". "+c2+p.f2+". "+c3+p.extra+". "+close;
    var qs=[];
    qs.push(mc(r,"Reading","C","main idea","What is the passage mainly about?",cap(p.subj)+" and its features.",distinct(r,FACT_PACKS.filter(function(x){return x.subj!==p.subj;}).map(function(x){return cap(x.subj)+" and its features.";}),cap(p.subj)+" and its features.",3)));
    qs.push(mc(r,"Reading","F","detail","Where is "+p.subj+" found?",p.where,distinct(r,FACT_PACKS.map(function(x){return x.where;}),p.where,3)));
    qs.push(mc(r,"Reading","C","detail","According to the passage, it:",cap(p.f1)+".",distinct(r,FACT_PACKS.filter(function(x){return x.subj!==p.subj;}).map(function(x){return cap(x.f1)+".";}),cap(p.f1)+".",3)));
    qs.push(mc(r,"Reading","C","detail","Which other fact is given?",cap(p.f2)+".",distinct(r,FACT_PACKS.filter(function(x){return x.subj!==p.subj;}).map(function(x){return cap(x.f2)+".";}),cap(p.f2)+".",3)));
    qs.push(mc(r,"Reading","H","vocabulary","The word “"+p.vocab[0]+"” most nearly means:",p.vocab[1],distinct(r,["harmful","distant","noisy","empty","sudden","hidden"],p.vocab[1],3,[p.vocab[0]])));
    qs.push(mc(r,"Reading","H","inference","We can infer from the passage that "+p.subj+":","is remarkable in more than one way",["is not interesting to anyone","exists only in stories","has no useful features"]));
    qs.push(mc(r,"Reading","C","author purpose","The author's main purpose is to:","inform the reader with facts",["frighten the reader","sell something","tell a funny joke"]));
    qs.push(mc(r,"Reading","H","tone","The tone of the passage is:","informative",["angry","sarcastic","sad"]));
    return {title:cap(p.subj.replace(/^the /,"")), passage:passage, qs:qs};
  }

  /* ===================== WRITING PROMPT BUILDER ===================== */
  var W_NARR=["a day you will never forget","a time you helped someone","an adventure you would like to have","your happiest memory","a time you were surprised","the best gift you ever received","a time you felt proud of yourself","a journey you once took","a time you made a new friend","something funny that happened to you","a time you tried something for the first time","a lost item and how it was found"];
  var W_DESC=["your favourite place and why you like it","a person you admire","your ideal weekend","a festival or celebration in your culture","your dream home","a machine that would make life easier","your favourite meal and how it is made","an animal you would like as a pet","the view from your window","a hobby you enjoy","your school and what makes it special","a season of the year and how it feels"];
  var W_OPIN=["Should students wear school uniforms?","Should mobile phones be allowed in class?","Is it better to live in a city or the countryside?","Should homework be reduced?","Are zoos good or bad for animals?","Should sports be a compulsory school subject?","Should the school day be shorter?","Is it better to read a book or watch its film?","Should children have their own pocket money?","Should plastic bottles be banned at school?"];
  var W_ARG=["the benefits and drawbacks of social media","whether technology makes us more or less connected","whether schools should teach life skills like budgeting","how communities can reduce waste","the value of learning a second language","whether space exploration is worth its cost","how artificial intelligence might change everyday jobs","whether cities should limit private cars","the importance of protecting endangered species","whether young people should volunteer in their community"];
  function buildWriting(r,band){
    if(band<=1){ return "Write 3–5 sentences about "+pick(r,W_NARR)+". Use full sentences and capital letters."; }
    if(band===2){ return r()<0.5 ? "Describe "+pick(r,W_DESC)+". Write a short paragraph with at least four sentences."
                                 : "Write a short story about "+pick(r,W_NARR)+". Include a beginning, middle and end."; }
    if(band===3){ return r()<0.5 ? "Write a paragraph giving your opinion: "+pick(r,W_OPIN)+" Give at least two reasons and an example."
                                 : "Write about "+pick(r,W_DESC)+", using clear paragraphs and linking words (first, however, finally)."; }
    return r()<0.5 ? "Write a short essay discussing "+pick(r,W_ARG)+". Present both sides and end with your own view."
                   : "“"+pick(r,W_OPIN)+"” Write a persuasive response arguing your position with reasons, evidence and a clear conclusion.";
  }

  /* ===================== PUBLIC API ===================== */
  function pickTemplates(list,band){ return list.filter(function(t){ return band>=t.b; }); }
  function items(grade, seedStr, count){
    count=count||12; var band=bandOf(grade), r=rng("ITEMS|"+grade+"|"+seedStr);
    var G=pickTemplates(GRAMMAR,band), V=pickTemplates(VOCAB,band);
    if(!G.length) G=GRAMMAR; if(!V.length) V=VOCAB;
    // Aim ~60% grammar, ~40% vocabulary; keep a Foundational/Core/Challenge spread; avoid duplicate stems.
    var nG=Math.round(count*0.6), nV=count-nG, out=[], seen={}, guard=0;
    function add(pool){ var t=pick(r,pool), it=t.fn(r); var key=it.q+"|"+it.options.join("|"); if(seen[key]) return false; seen[key]=1; out.push(it); return true; }
    var gc=0; guard=0; while(gc<nG && guard<400){ guard++; if(add(G)) gc++; }
    var vc=0; guard=0; while(vc<nV && guard<400){ guard++; if(add(V)) vc++; }
    // difficulty order: F, then C, then H (matches the rest of the app)
    var rank={F:0,C:1,H:2}; out.sort(function(a,b){ return (rank[a.level]||1)-(rank[b.level]||1); });
    return out.slice(0,count);
  }
  function reading(grade, seedStr){
    var band=bandOf(grade), r=rng("READ|"+grade+"|"+seedStr);
    return band<=2 ? buildNarrative(r,band) : buildFactual(r,band);
  }
  function writing(grade, seedStr){
    var band=bandOf(grade), r=rng("WRITE|"+grade+"|"+seedStr);
    return buildWriting(r,band);
  }
  var api={ items:items, reading:reading, writing:writing, _band:bandOf };
  if(typeof window!=="undefined") window.ENG_GEN=api;
  if(typeof globalThis!=="undefined") globalThis.ENG_GEN=api;
})();
