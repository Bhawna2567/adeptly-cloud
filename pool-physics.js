/* Adeptly — Physics diagnostic question pools (Advanced stream).
   Aligned to MOE Term-1 2025-26 scope & sequence.
   A class is diagnosed on the PREVIOUS grade's content (gap analysis):
     Grade 9A class  -> tests grade "8"  (readiness: measurement, motion, forces)
     Grade 10A class -> tests grade "9A" (Mechanics in One Dimension)
     Grade 11A class -> tests grade "10A" (Waves & Light: waves, sound, light basics)
     Grade 12A class -> tests grade "11A" (Waves & Light: reflection, refraction, optics, Doppler)
   Each question: {skill, level(F/C/H), sub, q, options[4], answer(index)}.
   Skills: "Measurement & Units", "Motion & Forces", "Waves & Sound", "Light & Optics". */
if (typeof QUESTION_POOL === "undefined") { var QUESTION_POOL = {}; }
(function(){
  function put(grade, list){ QUESTION_POOL[grade]=QUESTION_POOL[grade]||{}; QUESTION_POOL[grade]["Physics"]=list; }

  /* ---------- Grade 8 readiness (for a Grade 9A class) ---------- */
  put("8", [
   {skill:"Measurement & Units",level:"F",sub:"SI units",q:"Which is the SI unit of length?",options:["litre","metre","gram","hour"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"Measuring tools",q:"Which tool best measures the length of a pencil?",options:["thermometer","stopwatch","ruler","balance"],answer:2},
   {skill:"Measurement & Units",level:"F",sub:"SI units",q:"Which is the SI unit of mass?",options:["newton","metre","kilogram","second"],answer:2},
   {skill:"Measurement & Units",level:"F",sub:"SI units",q:"Which is the SI unit of time?",options:["second","hour","metre","litre"],answer:0},
   {skill:"Motion & Forces",level:"F",sub:"Forces",q:"A force is best described as a:",options:["colour","push or pull","sound","temperature"],answer:1},
   {skill:"Motion & Forces",level:"F",sub:"Gravity",q:"What pulls objects down towards the ground?",options:["friction","magnetism","gravity","light"],answer:2},
   {skill:"Motion & Forces",level:"F",sub:"Speed",q:"A car travels 100 m in 10 s. What is its speed?",options:["1 m/s","10 m/s","1000 m/s","110 m/s"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"Measuring tools",q:"Which instrument measures temperature?",options:["ruler","balance","thermometer","ammeter"],answer:2},
   {skill:"Motion & Forces",level:"C",sub:"Speed",q:"A runner covers 60 m in 12 s. What is the average speed?",options:["12 m/s","72 m/s","0.2 m/s","5 m/s"],answer:3},
   {skill:"Motion & Forces",level:"C",sub:"Friction",q:"Friction between two surfaces usually acts to:",options:["oppose motion","speed up motion","create light","add mass"],answer:0},
   {skill:"Measurement & Units",level:"C",sub:"Derived units",q:"Speed is normally measured in:",options:["kilograms","metres per second","seconds","newtons"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Mass and weight",q:"The weight of an object depends mainly on:",options:["its colour","gravity","its temperature","its speed"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Energy",q:"The energy an object has because it is moving is called:",options:["potential energy","chemical energy","kinetic energy","light energy"],answer:2},
   {skill:"Motion & Forces",level:"H",sub:"Speed",q:"A cyclist rides at 8 m/s for 5 s. How far does she travel?",options:["13 m","1.6 m","40 m","45 m"],answer:2},
   {skill:"Motion & Forces",level:"H",sub:"Balanced forces",q:"If all the forces on a moving object are balanced, the object will:",options:["keep moving at constant velocity","always speed up","stop instantly","change colour"],answer:0},
   {skill:"Measurement & Units",level:"H",sub:"Unit prefixes",q:"1 kilometre is equal to how many metres?",options:["10","100","1000","10000"],answer:2},
   {skill:"Measurement & Units",level:"F",sub:"Measuring quantities",q:"Which unit is used to measure volume?",options:["metre","litre","kilogram","second"],answer:1},
   {skill:"Motion & Forces",level:"F",sub:"Forces",q:"Which of these is NOT a force?",options:["gravity","friction","magnetism","temperature"],answer:3},
   {skill:"Measurement & Units",level:"F",sub:"Measuring tools",q:"A balance (scale) is used to measure:",options:["time","speed","mass","temperature"],answer:2},
   {skill:"Motion & Forces",level:"F",sub:"Speed",q:"An object that is not moving has a speed of:",options:["10 m/s","zero","1 m/s","100 m/s"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Speed",q:"A bus travels 90 m in 9 s. Its speed is:",options:["9 m/s","81 m/s","10 m/s","810 m/s"],answer:2},
   {skill:"Motion & Forces",level:"H",sub:"Speed",q:"A toy car moves at 5 m/s for 4 s. How far does it travel?",options:["9 m","20 m","1.25 m","54 m"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"Measuring tools",q:"Which tool would you use to find the mass of an object?",options:["spring only","balance","ruler","stopwatch"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"Unit prefixes",q:"1 metre is equal to how many centimetres?",options:["10","100","1000","1"],answer:1},
   {skill:"Measurement & Units",level:"C",sub:"Unit conversion",q:"A book has a mass of 2 kg. What is this in grams?",options:["200 g","2000 g","20 g","20000 g"],answer:1},
   {skill:"Measurement & Units",level:"C",sub:"Ordering units",q:"Which list goes from smallest to largest?",options:["m, cm, mm","mm, cm, m","cm, mm, m","mm, m, cm"],answer:1},
   {skill:"Motion & Forces",level:"F",sub:"Units of force",q:"The unit of force is the:",options:["joule","newton","watt","pascal"],answer:1},
   {skill:"Motion & Forces",level:"F",sub:"Friction",q:"A moving ball on the ground slows down and stops mainly because of:",options:["gravity","friction","magnetism","sound"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Speed",q:"A car travels 240 m in 30 s. What is its speed?",options:["8 m/s","210 m/s","270 m/s","0.125 m/s"],answer:0},
   {skill:"Motion & Forces",level:"C",sub:"Friction",q:"Which change would INCREASE friction between two surfaces?",options:["adding oil","making them rougher","adding wheels","making them smoother"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Gravity",q:"An object weighs less on the Moon than on Earth because the Moon has less:",options:["mass","gravity","air","light"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Energy",q:"A stretched rubber band stores which type of energy?",options:["kinetic","elastic potential","light","sound"],answer:1},
   {skill:"Motion & Forces",level:"H",sub:"Speed",q:"A cyclist rides at 6 m/s for 10 s. How far does she travel?",options:["16 m","60 m","1.6 m","0.6 m"],answer:1},
   {skill:"Motion & Forces",level:"H",sub:"Weight",q:"Using g ≈ 10 N/kg, the weight of a 2 kg object is about:",options:["2 N","20 N","0.2 N","200 N"],answer:1}
  ]);

  /* ---------- Grade 9 — Mechanics in One Dimension (for a Grade 10A class) ---------- */
  put("9A", [
   {skill:"Measurement & Units",level:"F",sub:"Base quantities",q:"Which of these is a base quantity?",options:["speed","time","force","energy"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"SI units",q:"The SI unit of mass is the:",options:["newton","joule","kilogram","metre"],answer:2},
   {skill:"Motion & Forces",level:"F",sub:"Scalars and vectors",q:"Which quantity is a vector (it has direction)?",options:["distance","mass","displacement","time"],answer:2},
   {skill:"Motion & Forces",level:"F",sub:"Distance and displacement",q:"Distance differs from displacement because distance:",options:["has no direction","is always negative","is measured in seconds","is a vector"],answer:0},
   {skill:"Motion & Forces",level:"F",sub:"Speed",q:"A car moves 150 m in 30 s at a steady speed. Its speed is:",options:["15 m/s","5 m/s","180 m/s","0.2 m/s"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"Measuring tools",q:"Which tool measures small lengths most precisely?",options:["metre ruler","measuring tape","vernier caliper","trundle wheel"],answer:2},
   {skill:"Motion & Forces",level:"F",sub:"Velocity",q:"Velocity is best defined as:",options:["speed in a given direction","distance only","mass times speed","the time taken"],answer:0},
   {skill:"Measurement & Units",level:"C",sub:"Precision and accuracy",q:"Accuracy describes how close a measurement is to:",options:["the average reading","the true value","zero","the largest reading"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Acceleration",q:"Acceleration is the rate of change of:",options:["velocity","distance","mass","force"],answer:0},
   {skill:"Motion & Forces",level:"C",sub:"Acceleration",q:"A car speeds up from 0 to 20 m/s in 4 s. Its acceleration is:",options:["80 m/s²","24 m/s²","5 m/s²","0.2 m/s²"],answer:2},
   {skill:"Motion & Forces",level:"C",sub:"Motion graphs",q:"On a position–time graph, a straight sloped line shows the object moving at:",options:["constant velocity","rest","increasing acceleration","zero speed"],answer:0},
   {skill:"Motion & Forces",level:"C",sub:"Velocity",q:"A cyclist travels 240 m in 30 s. The average velocity is:",options:["6 m/s","8 m/s","270 m/s","0.125 m/s"],answer:1},
   {skill:"Measurement & Units",level:"C",sub:"Derived quantities",q:"Which of these is a derived quantity?",options:["time","mass","speed","length"],answer:2},
   {skill:"Motion & Forces",level:"H",sub:"Free fall",q:"Ignoring air resistance, objects near Earth fall with an acceleration of about:",options:["1 m/s²","9.8 m/s²","100 m/s²","0 m/s²"],answer:1},
   {skill:"Motion & Forces",level:"H",sub:"Acceleration",q:"A car speeds up from 10 m/s to 30 m/s in 5 s. Its acceleration is:",options:["20 m/s²","8 m/s²","4 m/s²","40 m/s²"],answer:2},
   {skill:"Motion & Forces",level:"H",sub:"Motion graphs",q:"On a velocity–time graph, the slope of the line represents the:",options:["acceleration","distance","mass","force"],answer:0},
   {skill:"Motion & Forces",level:"H",sub:"Free fall",q:"An object is dropped from rest. After 2 s its speed is about (g ≈ 9.8 m/s²):",options:["about 5 m/s","about 20 m/s","about 40 m/s","0 m/s"],answer:1},
   {skill:"Measurement & Units",level:"H",sub:"Significant figures",q:"How many significant figures are in the measurement 3.0 cm?",options:["1","2","3","0"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"SI units",q:"The SI unit of time is the:",options:["minute","second","hour","metre"],answer:1},
   {skill:"Motion & Forces",level:"F",sub:"Acceleration",q:"An object moving at constant velocity has an acceleration of:",options:["9.8 m/s²","10 m/s²","zero","increasing"],answer:2},
   {skill:"Motion & Forces",level:"F",sub:"Motion graphs",q:"On a distance–time graph, a flat (horizontal) line means the object is:",options:["speeding up","at rest","moving quickly","falling"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Speed",q:"A train travels 300 m in 20 s. Its average speed is:",options:["20 m/s","15 m/s","6000 m/s","0.07 m/s"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Acceleration",q:"A car speeds up from 0 to 30 m/s in 6 s. Its acceleration is:",options:["5 m/s²","180 m/s²","0.2 m/s²","24 m/s²"],answer:0},
   {skill:"Motion & Forces",level:"H",sub:"Deceleration",q:"A car slows from 20 m/s to rest in 4 s. Its acceleration is:",options:["-5 m/s²","5 m/s²","-80 m/s²","-0.2 m/s²"],answer:0},
   {skill:"Motion & Forces",level:"C",sub:"Distance and displacement",q:"Displacement is best described as:",options:["the total path length","the distance in a given direction","speed multiplied by mass","a scalar quantity"],answer:1},
   {skill:"Motion & Forces",level:"F",sub:"Scalars and vectors",q:"Which of these is a scalar quantity?",options:["velocity","displacement","speed","acceleration"],answer:2},
   {skill:"Motion & Forces",level:"H",sub:"Free fall",q:"Ignoring air resistance, two balls of different mass dropped together will:",options:["let the heavier one land first","let the lighter one land first","land at the same time","never fall"],answer:2},
   {skill:"Motion & Forces",level:"C",sub:"Motion graphs",q:"The area under a velocity–time graph represents the:",options:["acceleration","displacement","mass","force"],answer:1},
   {skill:"Motion & Forces",level:"C",sub:"Motion graphs",q:"A velocity–time graph is a horizontal line above zero. The object is:",options:["at rest","moving at constant velocity","accelerating","decelerating"],answer:1},
   {skill:"Measurement & Units",level:"C",sub:"Significant figures",q:"How many significant figures are in the measurement 0.040 kg?",options:["1","2","3","4"],answer:1},
   {skill:"Measurement & Units",level:"F",sub:"Measuring tools",q:"Which instrument is used to measure a time interval?",options:["ruler","stopwatch","balance","ammeter"],answer:1},
   {skill:"Motion & Forces",level:"H",sub:"Acceleration",q:"A runner reaches 8 m/s from rest in 2 s. The acceleration is:",options:["4 m/s²","16 m/s²","0.25 m/s²","10 m/s²"],answer:0},
   {skill:"Motion & Forces",level:"C",sub:"Velocity",q:"Average velocity is calculated as displacement divided by:",options:["mass","time","force","acceleration"],answer:1},
   {skill:"Measurement & Units",level:"C",sub:"Scalars and vectors",q:"Which of these is a vector quantity?",options:["mass","time","acceleration","temperature"],answer:2}
  ]);

  /* ---------- Grade 10 — Waves & Light basics (for a Grade 11A class) ---------- */
  put("10A", [
   {skill:"Waves & Sound",level:"F",sub:"Frequency",q:"The number of waves passing a point each second is the:",options:["wavelength","frequency","amplitude","speed"],answer:1},
   {skill:"Waves & Sound",level:"F",sub:"Wavelength",q:"The distance between two neighbouring crests of a wave is the:",options:["wavelength","frequency","amplitude","period"],answer:0},
   {skill:"Waves & Sound",level:"F",sub:"Amplitude",q:"The distance from the middle of a wave to a crest is the:",options:["wavelength","frequency","amplitude","period"],answer:2},
   {skill:"Waves & Sound",level:"F",sub:"Sound medium",q:"Sound waves need a ___ in order to travel.",options:["vacuum","magnet","material medium","battery"],answer:2},
   {skill:"Light & Optics",level:"F",sub:"Light travel",q:"In everyday situations, light normally travels in:",options:["straight lines","tight circles","zig-zags","random curves"],answer:0},
   {skill:"Waves & Sound",level:"F",sub:"Units",q:"Frequency is measured in:",options:["metres","hertz (Hz)","seconds","newtons"],answer:1},
   {skill:"Light & Optics",level:"F",sub:"Speed of light",q:"Light travels fastest in:",options:["water","glass","a vacuum","diamond"],answer:2},
   {skill:"Waves & Sound",level:"C",sub:"Wave equation",q:"A wave has frequency 5 Hz and wavelength 2 m. Its speed is:",options:["2.5 m/s","10 m/s","7 m/s","0.4 m/s"],answer:1},
   {skill:"Waves & Sound",level:"C",sub:"Transverse waves",q:"In a transverse wave, the vibration is:",options:["at right angles to the wave direction","along the wave direction","in a circle","absent"],answer:0},
   {skill:"Waves & Sound",level:"C",sub:"Pitch",q:"A sound of higher frequency is heard as a:",options:["louder sound","higher pitch","quieter sound","lower pitch"],answer:1},
   {skill:"Waves & Sound",level:"C",sub:"Loudness",q:"A sound wave with a larger amplitude sounds:",options:["higher","quieter","louder","faster"],answer:2},
   {skill:"Light & Optics",level:"C",sub:"Reflection",q:"When light bounces off a mirror, this is called:",options:["reflection","refraction","diffraction","absorption"],answer:0},
   {skill:"Waves & Sound",level:"C",sub:"Period",q:"The time taken for one complete wave is the:",options:["frequency","amplitude","period","wavelength"],answer:2},
   {skill:"Waves & Sound",level:"H",sub:"Wave equation",q:"A sound wave travels at 340 m/s with wavelength 2 m. Its frequency is:",options:["170 Hz","680 Hz","342 Hz","85 Hz"],answer:0},
   {skill:"Waves & Sound",level:"H",sub:"Period and frequency",q:"A wave has a period of 0.5 s. Its frequency is:",options:["2 Hz","0.5 Hz","5 Hz","50 Hz"],answer:0},
   {skill:"Waves & Sound",level:"H",sub:"Longitudinal waves",q:"Sound waves are ___ waves.",options:["transverse","longitudinal","electromagnetic","standing"],answer:1},
   {skill:"Waves & Sound",level:"H",sub:"Wave equation",q:"A wave travels at 20 m/s with a frequency of 4 Hz. Its wavelength is:",options:["80 m","24 m","5 m","0.2 m"],answer:2},
   {skill:"Light & Optics",level:"H",sub:"Nature of light",q:"Light is a type of ___ wave.",options:["sound","electromagnetic","water","seismic"],answer:1},
   {skill:"Waves & Sound",level:"F",sub:"Wave parts",q:"The highest point of a transverse wave is called the:",options:["trough","crest","node","medium"],answer:1},
   {skill:"Waves & Sound",level:"F",sub:"Wave parts",q:"The lowest point of a transverse wave is called the:",options:["crest","amplitude","trough","period"],answer:2},
   {skill:"Light & Optics",level:"F",sub:"Colour",q:"White light can be split into its colours using a:",options:["magnet","mirror","prism","wire"],answer:2},
   {skill:"Waves & Sound",level:"C",sub:"Wave equation",q:"A wave has speed 12 m/s and wavelength 3 m. Its frequency is:",options:["36 Hz","4 Hz","15 Hz","9 Hz"],answer:1},
   {skill:"Waves & Sound",level:"C",sub:"Wave equation",q:"A wave has frequency 10 Hz and wavelength 3 m. Its speed is:",options:["30 m/s","3.3 m/s","13 m/s","300 m/s"],answer:0},
   {skill:"Waves & Sound",level:"H",sub:"Wave equation",q:"A wave travels at 300 m/s with a frequency of 60 Hz. Its wavelength is:",options:["5 m","0.2 m","360 m","18000 m"],answer:0},
   {skill:"Waves & Sound",level:"C",sub:"Period and frequency",q:"A wave has a period of 0.25 s. Its frequency is:",options:["4 Hz","0.25 Hz","2.5 Hz","40 Hz"],answer:0},
   {skill:"Waves & Sound",level:"F",sub:"Sound medium",q:"Sound cannot travel through:",options:["air","water","steel","a vacuum"],answer:3},
   {skill:"Waves & Sound",level:"C",sub:"Pitch",q:"Increasing the frequency of a sound raises its:",options:["loudness","pitch","speed","amplitude"],answer:1},
   {skill:"Light & Optics",level:"F",sub:"Dispersion",q:"Splitting white light into a spectrum of colours is called:",options:["reflection","dispersion","diffraction","absorption"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Reflection",q:"In the law of reflection, angles are measured from the:",options:["mirror surface","normal","floor","crest"],answer:1},
   {skill:"Light & Optics",level:"F",sub:"Speed of light",q:"Light travels more slowly in glass than in:",options:["a vacuum","diamond","water only","nothing"],answer:0},
   {skill:"Waves & Sound",level:"F",sub:"Amplitude",q:"The maximum displacement of a wave from its rest position is the:",options:["wavelength","amplitude","frequency","period"],answer:1},
   {skill:"Waves & Sound",level:"H",sub:"Wave equation",q:"A wave has frequency 25 Hz and wavelength 4 m. Its speed is:",options:["100 m/s","6.25 m/s","29 m/s","0.16 m/s"],answer:0},
   {skill:"Waves & Sound",level:"C",sub:"Speed of sound",q:"Sound generally travels FASTEST in:",options:["air","water","steel","a vacuum"],answer:2},
   {skill:"Light & Optics",level:"C",sub:"Echoes",q:"An echo is produced by the ___ of sound.",options:["reflection","refraction","diffraction","absorption"],answer:0},
   {skill:"Light & Optics",level:"H",sub:"Colour and wavelength",q:"Compared with red light, blue light has a:",options:["longer wavelength","shorter wavelength","equal wavelength","zero wavelength"],answer:1}
  ]);

  /* ---------- Grade 11 — Reflection, Refraction & Optics (for a Grade 12A class) ---------- */
  put("11A", [
   {skill:"Light & Optics",level:"F",sub:"Law of reflection",q:"In reflection, the angle of incidence equals the angle of:",options:["reflection","refraction","diffraction","elevation"],answer:0},
   {skill:"Light & Optics",level:"F",sub:"Refraction",q:"When light passes from air into glass and changes direction, this is called:",options:["reflection","refraction","diffraction","polarization"],answer:1},
   {skill:"Light & Optics",level:"F",sub:"Plane mirrors",q:"The image formed by a flat (plane) mirror is:",options:["upright and virtual","upside down and real","larger and real","on the mirror surface"],answer:0},
   {skill:"Light & Optics",level:"F",sub:"Specular reflection",q:"Reflection from a smooth, shiny mirror is called:",options:["diffuse reflection","specular reflection","refraction","diffraction"],answer:1},
   {skill:"Waves & Sound",level:"F",sub:"Doppler effect",q:"The change in a wave's frequency caused by motion of the source or observer is the:",options:["Doppler effect","law of reflection","refraction","polarization"],answer:0},
   {skill:"Light & Optics",level:"F",sub:"Diffraction",q:"The spreading of light as it passes through a very narrow gap is called:",options:["reflection","refraction","diffraction","absorption"],answer:2},
   {skill:"Light & Optics",level:"F",sub:"The normal",q:"Angles of incidence and reflection are measured from the:",options:["mirror surface","normal (perpendicular line)","ground","horizontal"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Snell's law",q:"Snell's law relates the angle of incidence to the angle of:",options:["reflection","refraction","diffraction","elevation"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Refraction",q:"As light enters a denser medium such as glass, it slows down and bends:",options:["towards the normal","away from the normal","straight back","upwards"],answer:0},
   {skill:"Light & Optics",level:"C",sub:"Total internal reflection",q:"Total internal reflection can occur when light travels from:",options:["air into glass","glass into air beyond the critical angle","a vacuum into glass","air into water"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Optical fibres",q:"Optical fibres carry light signals by using:",options:["total internal reflection","diffraction","refraction only","polarization"],answer:0},
   {skill:"Waves & Sound",level:"C",sub:"Doppler applications",q:"A police radar speed gun measures a car's speed using the:",options:["Doppler effect","law of reflection","Snell's law","diffraction"],answer:0},
   {skill:"Light & Optics",level:"C",sub:"Polarization",q:"Polarization of light is possible because light is a:",options:["transverse wave","longitudinal wave","sound wave","standing wave"],answer:0},
   {skill:"Light & Optics",level:"H",sub:"Law of reflection",q:"A ray strikes a mirror at 30° to the normal. The angle of reflection is:",options:["60°","30°","15°","90°"],answer:1},
   {skill:"Light & Optics",level:"H",sub:"Curved mirrors",q:"A concave mirror can form:",options:["a real, inverted image","only virtual images","no image at all","always a larger upright image"],answer:0},
   {skill:"Light & Optics",level:"H",sub:"Critical angle",q:"Beyond the critical angle, light hitting a glass–air boundary is:",options:["completely reflected back into the glass","fully refracted out","absorbed","polarized"],answer:0},
   {skill:"Waves & Sound",level:"H",sub:"Doppler effect",q:"As a sound source moves towards you, the frequency you hear:",options:["increases","decreases","stays the same","becomes zero"],answer:0},
   {skill:"Light & Optics",level:"H",sub:"Refraction",q:"As light passes from glass out into air, it bends:",options:["away from the normal","towards the normal","along the normal","straight back"],answer:0},
   {skill:"Light & Optics",level:"F",sub:"Curved mirrors",q:"A mirror that curves inwards is called a:",options:["convex mirror","plane mirror","concave mirror","flat mirror"],answer:2},
   {skill:"Light & Optics",level:"F",sub:"Lenses",q:"A lens that is thicker in the middle than at the edges is a:",options:["converging (convex) lens","diverging (concave) lens","plane mirror","prism"],answer:0},
   {skill:"Light & Optics",level:"F",sub:"Refraction",q:"The bending of light as it passes from air into water is called:",options:["reflection","refraction","diffraction","absorption"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Refraction",q:"When light travels from air into glass, its speed:",options:["increases","stays the same","decreases","becomes zero"],answer:2},
   {skill:"Light & Optics",level:"H",sub:"Law of reflection",q:"A ray strikes a mirror at 50° to the normal. The angle of reflection is:",options:["40°","50°","25°","90°"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Refraction",q:"Light entering water from air bends towards the normal because water is optically:",options:["less dense","denser","hotter","brighter"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Critical angle",q:"Total internal reflection occurs only when the angle of incidence is:",options:["less than the critical angle","equal to zero","greater than the critical angle","exactly 45°"],answer:2},
   {skill:"Light & Optics",level:"F",sub:"Lenses",q:"A convex (converging) lens can form a real image when the object is:",options:["at the lens","beyond the focal point","behind the eye","inside the lens"],answer:1},
   {skill:"Light & Optics",level:"F",sub:"Lenses",q:"A concave (diverging) lens always forms an image that is:",options:["real and larger","virtual, upright and smaller","real and inverted","on the lens"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Refractive index",q:"Refractive index compares the speed of light in a vacuum with its speed in the:",options:["mirror","medium","air only","source"],answer:1},
   {skill:"Light & Optics",level:"H",sub:"Refraction",q:"Light passing from glass into air (a less dense medium) bends:",options:["towards the normal","away from the normal","along the normal","straight back"],answer:1},
   {skill:"Waves & Sound",level:"C",sub:"Doppler effect",q:"As a source of sound moves away from you, the frequency you hear:",options:["increases","decreases","stays the same","doubles"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Plane mirrors",q:"A periscope lets you see over obstacles mainly by using:",options:["lenses","plane mirrors","prisms only","diffraction gratings"],answer:1},
   {skill:"Light & Optics",level:"H",sub:"Plane mirrors",q:"For a plane mirror, the image forms behind the mirror at a distance equal to the:",options:["focal length","object distance in front","radius of curvature","wavelength"],answer:1},
   {skill:"Light & Optics",level:"C",sub:"Lenses",q:"The point where rays parallel to the axis meet after a convex lens is the:",options:["centre of curvature","focal point","normal","aperture"],answer:1},
   {skill:"Light & Optics",level:"F",sub:"Colour and wavelength",q:"Which colour of visible light has the LONGEST wavelength?",options:["red","blue","violet","green"],answer:0},
   {skill:"Light & Optics",level:"C",sub:"Diffuse reflection",q:"When light reflects off a rough surface and scatters in many directions, it is called:",options:["specular reflection","diffuse reflection","refraction","dispersion"],answer:1}
  ]);
})();
