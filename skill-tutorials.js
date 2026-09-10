/* Adeptly — student-facing skill tutorials.
   Short "learn it first" explanations shown before the weekly practice exercises.
   SKILL_TUTORIALS[skillName] = { title, html }.  Keyed by the same skill names used in the
   diagnostic/plan (English, Maths, Physics, Science and Chemistry strands).
   Load AFTER curriculum.js; used by viewFolders / renderExercise. */
if (typeof SKILL_TUTORIALS === "undefined") { var SKILL_TUTORIALS = {}; }
(function(){
  function t(name, title, html){ SKILL_TUTORIALS[name]={title:title, html:html}; }
  var eg='style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px 12px;margin:8px 0"';
  var tip='style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:8px 12px;margin:8px 0;font-size:13px"';

  /* ---------------- ENGLISH ---------------- */
  t("Reading","Reading Comprehension",
    '<p>Reading comprehension means <b>understanding what a text is really saying</b> — not just reading the words.</p>'+
    '<ul><li><b>Skim first</b> for the general idea, then read again more slowly.</li>'+
    '<li><b>Find the main idea</b> — what is the whole passage mostly about?</li>'+
    '<li><b>Look back for details</b> — the answer to a "what/where/why" question is usually a specific line in the text.</li>'+
    '<li><b>Work out meaning from context</b> — if a word is new, the sentence around it gives clues.</li>'+
    '<li><b>Make inferences</b> — sometimes the answer is hinted at, not stated word-for-word.</li></ul>'+
    '<div '+eg+'><b>Example:</b> "The streets were wet and people carried umbrellas." <br>We can <i>infer</i> it had been raining, even though the text never says "rain".</div>'+
    '<div '+tip+'>💡 Tip: for each question, point to the exact words in the passage that prove your answer.</div>');

  t("Vocabulary","Vocabulary",
    '<p>Vocabulary is about <b>knowing what words mean</b> and choosing the right word.</p>'+
    '<ul><li><b>Synonyms</b> are words with a similar meaning (happy ≈ glad).</li>'+
    '<li><b>Antonyms</b> are opposites (begin ↔ end).</li>'+
    '<li><b>Context</b> — the other words in a sentence tell you which meaning fits.</li>'+
    '<li><b>Word parts</b> — prefixes/suffixes give clues: <i>un-</i> = not, <i>-less</i> = without, <i>re-</i> = again.</li></ul>'+
    '<div '+eg+'><b>Example:</b> "The room was so <b>dim</b> we could barely see." <br><i>Dim</i> means <b>not bright / dark</b> — the clue is "barely see".</div>'+
    '<div '+tip+'>💡 Tip: replace the word with your answer and re-read the sentence — it should still make sense.</div>');

  t("Grammar","Grammar",
    '<p>Grammar is the set of <b>rules that make a sentence correct</b>.</p>'+
    '<ul><li><b>Verb tense</b> — present, past or future must match the time (yesterday → past: "went").</li>'+
    '<li><b>Subject–verb agreement</b> — singular subject → singular verb ("She <b>runs</b>", not "She run").</li>'+
    '<li><b>Articles</b> — use <i>a</i> before a consonant sound, <i>an</i> before a vowel sound (a book, an apple).</li>'+
    '<li><b>Punctuation</b> — capital letters, full stops, commas and apostrophes.</li></ul>'+
    '<div '+eg+'><b>Example:</b> "Yesterday she ___ to school." → <b>walked</b> (past tense, because of "yesterday").</div>'+
    '<div '+tip+'>💡 Tip: read the sentence out loud with your choice — the correct one usually "sounds right".</div>');

  t("Writing","Writing",
    '<p>Good writing is <b>clear, organised and complete</b>.</p>'+
    '<ul><li><b>Plan</b> a beginning, middle and end before you start.</li>'+
    '<li><b>Topic sentence</b> — start each paragraph with its main point.</li>'+
    '<li><b>Linking words</b> — <i>first, next, however, because, finally</i> — join your ideas.</li>'+
    '<li><b>Check</b> capital letters, full stops and spelling at the end.</li></ul>'+
    '<div '+eg+'><b>Example plan (opinion):</b> 1) State your view · 2) Reason + example · 3) Another reason · 4) Conclusion.</div>'+
    '<div '+tip+'>💡 Tip: aim for full sentences and vary how they begin — it makes writing stronger.</div>');

  /* ---------------- MATHS ---------------- */
  t("Number & Operations","Number & Operations",
    '<p>This covers <b>calculating with numbers</b> — the four operations, fractions, decimals and percentages.</p>'+
    '<ul><li><b>Order of operations</b> — brackets, then × and ÷, then + and −.</li>'+
    '<li><b>Percentages</b> — "of" means multiply: 25% of 80 = 0.25 × 80 = 20.</li>'+
    '<li><b>Fractions</b> — simplify by dividing top and bottom by the same number.</li></ul>'+
    '<div '+eg+'><b>Example:</b> 30% of 200 = 30 ÷ 100 × 200 = <b>60</b>.</div>'+
    '<div '+tip+'>💡 Tip: estimate first (30% is about a third) so you can spot an answer that is clearly wrong.</div>');

  t("Algebra","Algebra",
    '<p>Algebra uses <b>letters to stand for unknown numbers</b> and finds their value.</p>'+
    '<ul><li><b>Keep both sides balanced</b> — do the same thing to each side of the equals sign.</li>'+
    '<li><b>Undo</b> operations in reverse: to solve 2x + 3 = 11, subtract 3, then divide by 2.</li>'+
    '<li><b>Substitute</b> — put the number in place of the letter to evaluate.</li></ul>'+
    '<div '+eg+'><b>Example:</b> 2x + 3 = 11 → 2x = 8 → x = <b>4</b>.</div>'+
    '<div '+tip+'>💡 Tip: check your answer by putting it back into the original equation.</div>');

  t("Geometry","Geometry",
    '<p>Geometry is about <b>shapes, angles, space and measurement</b>.</p>'+
    '<ul><li><b>Angles</b> on a straight line add to 180°; around a point they add to 360°.</li>'+
    '<li><b>Area</b>: rectangle = length × width; triangle = ½ × base × height.</li>'+
    '<li><b>Perimeter</b> is the distance all the way around a shape.</li></ul>'+
    '<div '+eg+'><b>Example:</b> A rectangle 5 cm by 3 cm has area 5 × 3 = <b>15 cm²</b> and perimeter 2(5+3) = <b>16 cm</b>.</div>'+
    '<div '+tip+'>💡 Tip: always write the unit — cm for length, cm² for area.</div>');

  t("Data & Probability","Data & Probability",
    '<p>This is about <b>handling data</b> (averages, graphs) and <b>chance</b>.</p>'+
    '<ul><li><b>Mean</b> = add all values ÷ how many. <b>Median</b> = the middle value in order. <b>Mode</b> = most common. <b>Range</b> = largest − smallest.</li>'+
    '<li><b>Probability</b> = (favourable outcomes) ÷ (total outcomes), from 0 (impossible) to 1 (certain).</li></ul>'+
    '<div '+eg+'><b>Example:</b> Data 4, 6, 6, 8 → mean = 24 ÷ 4 = <b>6</b>; range = 8 − 4 = <b>4</b>. One red ball in 4 → P(red) = <b>1/4</b>.</div>'+
    '<div '+tip+'>💡 Tip: put numbers in order before finding the median.</div>');

  /* ---------------- PHYSICS ---------------- */
  t("Measurement & Units","Measurement & Units",
    '<p>Science measures things using <b>agreed units</b>.</p>'+
    '<ul><li>Length → <b>metre (m)</b>, mass → <b>kilogram (kg)</b>, time → <b>second (s)</b>.</li>'+
    '<li><b>Prefixes</b>: kilo = 1000, centi = 1/100, milli = 1/1000. (1 km = 1000 m.)</li>'+
    '<li><b>Speed</b> = distance ÷ time, measured in m/s.</li></ul>'+
    '<div '+eg+'><b>Example:</b> A car travels 100 m in 20 s → speed = 100 ÷ 20 = <b>5 m/s</b>.</div>'+
    '<div '+tip+'>💡 Tip: always check the units match before you calculate.</div>');

  t("Motion & Forces","Motion & Forces",
    '<p>This is about <b>how things move and why</b>.</p>'+
    '<ul><li>A <b>force</b> is a push or a pull, measured in newtons (N).</li>'+
    '<li><b>Speed</b> = distance ÷ time; <b>acceleration</b> = change in velocity ÷ time.</li>'+
    '<li><b>Balanced forces</b> → no change in motion; <b>unbalanced forces</b> → speed up, slow down or turn.</li>'+
    '<li><b>Gravity</b> pulls objects down; friction opposes motion.</li></ul>'+
    '<div '+eg+'><b>Example:</b> Speed up from 0 to 20 m/s in 4 s → acceleration = 20 ÷ 4 = <b>5 m/s²</b>.</div>'+
    '<div '+tip+'>💡 Tip: on a velocity–time graph, the slope is the acceleration.</div>');

  t("Waves & Sound","Waves & Sound",
    '<p>Waves carry <b>energy</b> from place to place.</p>'+
    '<ul><li><b>Frequency</b> = waves per second (hertz, Hz); <b>wavelength</b> = length of one wave; <b>amplitude</b> = height (loudness/brightness).</li>'+
    '<li><b>Wave speed = frequency × wavelength.</b></li>'+
    '<li>Sound needs a <b>medium</b> (it cannot travel through a vacuum); higher frequency = higher pitch.</li></ul>'+
    '<div '+eg+'><b>Example:</b> frequency 5 Hz, wavelength 2 m → speed = 5 × 2 = <b>10 m/s</b>.</div>'+
    '<div '+tip+'>💡 Tip: learn v = f × λ — you can rearrange it to find any one of the three.</div>');

  t("Light & Optics","Light & Optics",
    '<p>Light is a wave that usually travels in <b>straight lines</b>.</p>'+
    '<ul><li><b>Reflection</b> — light bounces off; angle of incidence = angle of reflection (measured from the normal).</li>'+
    '<li><b>Refraction</b> — light bends when it changes speed entering a new material (e.g. air → glass).</li>'+
    '<li>A <b>prism</b> splits white light into colours (dispersion).</li></ul>'+
    '<div '+eg+'><b>Example:</b> A ray hits a mirror at 30° to the normal → it reflects at <b>30°</b>.</div>'+
    '<div '+tip+'>💡 Tip: angles in optics are always measured from the normal (the line at 90° to the surface).</div>');

  /* ---------------- SCIENCE (integrated) ---------------- */
  t("Life Science","Life Science",
    '<p>Life science studies <b>living things</b> — plants, animals and cells.</p>'+
    '<ul><li>The <b>cell</b> is the basic unit of life.</li>'+
    '<li>Living things need energy, grow, reproduce and respond to their surroundings.</li>'+
    '<li><b>Food chains</b> show how energy passes from one living thing to another.</li></ul>'+
    '<div '+eg+'><b>Example:</b> grass → grasshopper → bird. The arrow shows the direction energy flows.</div>'+
    '<div '+tip+'>💡 Tip: producers (plants) make their own food; consumers eat other living things.</div>');

  t("Physical Science","Physical Science",
    '<p>Physical science is about <b>matter and energy</b> and how they change.</p>'+
    '<ul><li><b>States of matter</b>: solid, liquid, gas — changed by heating or cooling.</li>'+
    '<li><b>Physical changes</b> (melting) can be reversed; <b>chemical changes</b> (burning) make new substances.</li>'+
    '<li>Energy comes in forms — heat, light, sound, electrical, kinetic.</li></ul>'+
    '<div '+eg+'><b>Example:</b> Ice → water → steam are physical changes; only the state changes, not the substance.</div>'+
    '<div '+tip+'>💡 Tip: if a new substance forms (gas, colour change, heat), it is a chemical change.</div>');

  t("Earth & Space Science","Earth & Space Science",
    '<p>This studies the <b>Earth, weather and space</b>.</p>'+
    '<ul><li>The <b>water cycle</b>: evaporation → condensation → precipitation → collection.</li>'+
    '<li>Earth has layers; its surface changes through weathering, erosion, earthquakes and volcanoes.</li>'+
    '<li>The Earth orbits the Sun (a year); it spins on its axis (day and night).</li></ul>'+
    '<div '+eg+'><b>Example:</b> The Sun heats water → it evaporates → cools into clouds → falls as rain.</div>'+
    '<div '+tip+'>💡 Tip: learn the water-cycle steps in order — many questions follow that sequence.</div>');

  t("Scientific Inquiry & Technology","Scientific Inquiry & Technology",
    '<p>This is <b>how scientists investigate</b> and how we design solutions.</p>'+
    '<ul><li>The method: ask a question → make a hypothesis → test it fairly → observe → conclude.</li>'+
    '<li>A <b>fair test</b> changes only one variable and keeps the others the same.</li>'+
    '<li>Use the right tool and record measurements carefully.</li></ul>'+
    '<div '+eg+'><b>Example:</b> Testing which soil grows taller plants — keep water, light and pot size the same; only change the soil.</div>'+
    '<div '+tip+'>💡 Tip: the one thing you deliberately change is the "independent variable".</div>');

  /* ---------------- CHEMISTRY ---------------- */
  t("Matter & Atomic Structure","Matter & Atomic Structure",
    '<p>Everything is made of <b>atoms</b>.</p>'+
    '<ul><li>An atom has a <b>nucleus</b> (protons + neutrons) with <b>electrons</b> around it.</li>'+
    '<li><b>Protons</b> are positive, <b>electrons</b> negative, <b>neutrons</b> neutral.</li>'+
    '<li>The <b>periodic table</b> arranges elements by atomic number (number of protons).</li></ul>'+
    '<div '+eg+'><b>Example:</b> Carbon has 6 protons, so its atomic number is <b>6</b>.</div>'+
    '<div '+tip+'>💡 Tip: in a neutral atom, the number of electrons equals the number of protons.</div>');

  t("Bonding & Compounds","Bonding & Compounds",
    '<p>Atoms join together by <b>bonding</b> to form compounds.</p>'+
    '<ul><li><b>Ionic bonds</b> — a metal gives electrons to a non-metal (e.g. NaCl, table salt).</li>'+
    '<li><b>Covalent bonds</b> — non-metals share electrons (e.g. H₂O, water).</li>'+
    '<li>A <b>compound</b> is two or more different elements chemically joined.</li></ul>'+
    '<div '+eg+'><b>Example:</b> Water is H₂O — two hydrogen atoms sharing electrons with one oxygen atom.</div>'+
    '<div '+tip+'>💡 Tip: metal + non-metal → ionic; non-metal + non-metal → covalent.</div>');

  t("Reactions & Stoichiometry","Reactions & Stoichiometry",
    '<p>Chemical reactions <b>rearrange atoms</b> to make new substances.</p>'+
    '<ul><li>Atoms are never lost — equations must be <b>balanced</b> (same atoms on both sides).</li>'+
    '<li>Reactants → products.</li>'+
    '<li>The <b>mole</b> is the chemist\'s way of counting particles.</li></ul>'+
    '<div '+eg+'><b>Example:</b> 2H₂ + O₂ → 2H₂O — there are 4 H and 2 O atoms on each side (balanced).</div>'+
    '<div '+tip+'>💡 Tip: balance by changing the big numbers (coefficients), never the small ones (subscripts).</div>');

  t("States, Solutions & Organic","States, Solutions & Organic",
    '<p>This covers <b>states of matter, mixtures/solutions and carbon chemistry</b>.</p>'+
    '<ul><li>Gas laws: heating a gas (at fixed volume) raises its pressure.</li>'+
    '<li>A <b>solution</b> = solute dissolved in a solvent (salt in water); concentration = amount per volume.</li>'+
    '<li><b>Organic</b> chemistry is the chemistry of carbon compounds (e.g. hydrocarbons like methane, CH₄).</li></ul>'+
    '<div '+eg+'><b>Example:</b> Dissolving 10 g of salt in water makes a solution — the salt is the solute, water the solvent.</div>'+
    '<div '+tip+'>💡 Tip: "like dissolves like" — many substances dissolve well in water.</div>');

  if(typeof window!=="undefined") window.SKILL_TUTORIALS=SKILL_TUTORIALS;
})();
