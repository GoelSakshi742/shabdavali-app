// ── Shabdavali Flashcard Data ────────────────────────────────────────────
// Medical Punjabi sourced from:
//   · Abbotsford Family Medicine — A Practical Guide to the Punjabi Language in Medicine (2019)
//   · CCHI Mini-Glossaries — cchicertification.org/cchi-mini-glossaries
// Format: { id, q (English), pa (Punjabi Gurmukhi + phonetic), m (meaning) }

export const BUILT_IN_CARDS = {

  // ── LEGAL (20 cards) ─────────────────────────────────────────────────────
  legal: [
    {id:'l1', q:'Absolute Discharge',        pa:'ਪੂਰਨ ਮੁਕਤੀ (Puran mukti)',                    m:'Offender found guilty but deemed not convicted; federal record still exists.'},
    {id:'l2', q:'Acquittal',                  pa:'ਬਰੀ ਹੋਣਾ (Bari hona)',                        m:'Finding of not guilty in a criminal case.'},
    {id:'l3', q:'Bail',                       pa:'ਜ਼ਮਾਨਤ (Zamanat)',                             m:"Monetary or other security to ensure accused's appearance at trial."},
    {id:'l4', q:'Mens Rea',                   pa:'ਅਪਰਾਧਿਕ ਇਰਾਦਾ (Apradhik iraada)',            m:'Criminal intent — the mental element of an offence.'},
    {id:'l5', q:'Habeas Corpus',              pa:'ਹੇਬੀਅਸ ਕਾਰਪਸ (Habeas Corpus)',               m:'Court order to bring detained person before court to determine if custody is legal.'},
    {id:'l6', q:'Presumption of Innocence',   pa:'ਬੇਗੁਨਾਹੀ ਦੀ ਧਾਰਨਾ (Begunaahi di dharna)',  m:'Under the Charter, charged person has right to be presumed innocent until proved guilty.'},
    {id:'l7', q:'Subpoena',                   pa:'ਅਦਾਲਤੀ ਸੰਮਨ (Adaalti samman)',               m:'Written order commanding person to come to court as witness with documents.'},
    {id:'l8', q:'Parole',                     pa:'ਪੈਰੋਲ (Parole)',                               m:'Release from prison before end of sentence; supervised with conditions.'},
    {id:'l9', q:'Crown Attorney',             pa:'ਕ੍ਰਾਊਨ ਵਕੀਲ (Crown vakeel)',                 m:'Lawyer representing the Crown in a criminal prosecution.'},
    {id:'l10',q:'Contempt of Court',          pa:'ਅਦਾਲਤ ਦੀ ਬੇਅਦਬੀ (Adaalat di beadabi)',       m:'Criminal offence involving interfering with justice or defying a judge.'},
    {id:'l11',q:'Tort',                       pa:'ਨਾਗਰਿਕ ਬੇਇਨਸਾਫ਼ੀ (Naagrik be-insaafi)',      m:'Civil action from wrongful act; plaintiff may sue for damages.'},
    {id:'l12',q:'Stare Decisis',              pa:'ਪਿਛਲੇ ਫੈਸਲਿਆਂ ਦੀ ਪਾਲਣਾ',                    m:'Following previous court decisions as precedent when making a judgment.'},
    {id:'l13',q:'Plea-Bargaining',            pa:'ਦਲੀਲਬਾਜ਼ੀ ਸਮਝੌਤਾ (Daleelbazi samjhauta)',   m:'Negotiations between defence counsel and Crown about charges and pleas.'},
    {id:'l14',q:'Legal Aid',                  pa:'ਕਾਨੂੰਨੀ ਸਹਾਇਤਾ (Kaanooni sahaayata)',        m:'Program assisting those who require a lawyer but cannot afford one.'},
    {id:'l15',q:'Probation',                  pa:'ਪ੍ਰੋਬੇਸ਼ਨ (Probation)',                       m:'Sentence requiring offender to obey stipulated conditions; max three years.'},
    {id:'l16',q:'Mistrial',                   pa:'ਅਸਫਲ ਮੁਕੱਦਮਾ (Asafal muqaddama)',            m:'Judge ends trial when fair verdict cannot be obtained; may order retrial.'},
    {id:'l17',q:'Will / Testament',           pa:'ਵਸੀਅਤ (Vasiyat)',                             m:'Legal document stating who receives your property upon death.'},
    {id:'l18',q:'Adjournment',                pa:'ਮੁਲਤਵੀ (Multavi)',                            m:'Postponement or continuance of a case to another date.'},
    {id:'l19',q:'Affidavit',                  pa:'ਸਹੁੰਚੁੱਕਿਆ ਬਿਆਨ (Sahunn-chukkiya biaan)',   m:'A sworn written declaration that certain facts are true.'},
    {id:'l20',q:'Power of Attorney',          pa:'ਮੁਖ਼ਤਾਰਨਾਮਾ (Mukhtaarnaama)',                m:'Legal document authorizing another person to act on your behalf.'},
  ],

  // ── SOCIAL WORK (20 cards) ───────────────────────────────────────────────
  social: [
    {id:'s1', q:'Advocacy',            pa:'ਵਕਾਲਤ (Vakaalat)',                          m:"Acting on a client's behalf to obtain needed resources and services."},
    {id:'s2', q:'Empathy',             pa:'ਹਮਦਰਦੀ (Hamdardi)',                         m:"The ability to see things from another's point of view."},
    {id:'s3', q:'Empowerment',         pa:'ਸ਼ਕਤੀਕਰਨ (Shaktikaran)',                   m:'Sense that people can create and take action to meet their own needs.'},
    {id:'s4', q:'Discrimination',      pa:'ਵਿਤਕਰਾ (Vitkara)',                          m:'Unequal treatment based on age, sex, ethnic or physical identity.'},
    {id:'s5', q:'Cultural Competency', pa:'ਸੱਭਿਆਚਾਰਕ ਯੋਗਤਾ (Sabhiyaacharak yogtaa)', m:'Ability to acknowledge different perceptions and incorporate them into practice.'},
    {id:'s6', q:'Burnout',             pa:'ਮਾਨਸਿਕ ਥਕਾਵਟ (Maansik thkaavat)',          m:'Condition of mental and physical exhaustion through overwork.'},
    {id:'s7', q:'Trauma',              pa:'ਮਾਨਸਿਕ ਸੱਟ (Maansik satt)',                m:'Deep psychological wound from a distressing or life-threatening event.'},
    {id:'s8', q:'Child Abuse',         pa:'ਬੱਚੇ ਨਾਲ ਦੁਰਵਿਵਹਾਰ (Bachche naal durvivhaar)', m:'Physical, psychological and emotional maltreatment endangering a child.'},
    {id:'s9', q:'Attachment',          pa:'ਲਗਾਅ (Lagaav)',                             m:'Strong emotional relationship between an infant and a caregiver.'},
    {id:'s10',q:'Foster Care',         pa:'ਪਾਲਕ ਦੇਖਭਾਲ (Paalak dekhbhal)',           m:'Interim care for children whose parents cannot currently provide it.'},
    {id:'s11',q:'Ageism',              pa:'ਬੁਢਾਪਾ ਵਿਤਕਰਾ (Budhapa vitkara)',          m:'Discrimination and prejudice against elderly people.'},
    {id:'s12',q:'Community',           pa:'ਭਾਈਚਾਰਾ (Bhaichaara)',                     m:'Group of people with common ties, interests or living in the same area.'},
    {id:'s13',q:'Assessment',          pa:'ਮੁਲਾਂਕਣ (Mulankhan)',                       m:'Process of developing understanding of the presenting problem and plan of action.'},
    {id:'s14',q:'Feminism',            pa:'ਨਾਰੀਵਾਦ (Naarivad)',                       m:'Belief that society systematically deprives women of choice, power and recognition.'},
    {id:'s15',q:'Extended Family',     pa:'ਸਾਂਝਾ ਪਰਿਵਾਰ (Saanjha parivaaar)',         m:'Family including parents, children, grandparents and other relations.'},
    {id:'s16',q:'Ethnocentrism',       pa:'ਕੌਮ-ਕੇਂਦਰਵਾਦ (Qaum-kendravaad)',           m:"Attitude that one's own culture is inherently superior to all others."},
    {id:'s17',q:'Accessibility',       pa:'ਪਹੁੰਚਯੋਗਤਾ (Pahunchyogtaa)',               m:'One of five Medicare principles — wide range of accessible services.'},
    {id:'s18',q:'Code of Ethics',      pa:'ਨੈਤਿਕ ਸੰਹਿਤਾ (Naitik sanhita)',           m:"A profession's standards concerning the ethical behavior of its members."},
    {id:'s19',q:'Grief',               pa:'ਸੋਗ (Sog)',                                m:'Deep sorrow following death of a loved one or significant loss.'},
    {id:'s20',q:'First Nations',       pa:'ਪਹਿਲੀਆਂ ਕੌਮਾਂ (Pehliyan qauaman)',        m:'Term referring to communities of status Indians; also a generic term.'},
  ],

  // ── MEDICAL (80 cards — from Abbotsford Guide + CCHI) ───────────────────
  medical: [

    // ── Basic Anatomy / Body Parts ──
    {id:'m1', q:'Head',             pa:'ਸਿਰ (Sir)',                   m:'Top of the body including skull, brain and face.'},
    {id:'m2', q:'Brain',            pa:'ਦਿਮਾਗ਼ (Dimag)',              m:'Central organ controlling all body functions, thoughts and movement.'},
    {id:'m3', q:'Skull',            pa:'ਖੋਪਰੀ (Khopari)',             m:'Bony structure that encloses and protects the brain.'},
    {id:'m4', q:'Forehead',         pa:'ਮੱਥਾ (Matha)',               m:'Upper part of the face above the eyebrows.'},
    {id:'m5', q:'Eye(s)',           pa:'ਅੱਖ / ਅੱਖਾਂ (Akh / Akhan)', m:'Organ of sight.'},
    {id:'m6', q:'Ear',              pa:'ਕੰਨ (Kun)',                  m:'Organ of hearing and balance.'},
    {id:'m7', q:'Nose',             pa:'ਨੱਕ (Nakh)',                 m:'Organ for breathing and smell; nosebleed is ਨਕਸੀਰ (Nakseer).'},
    {id:'m8', q:'Mouth',            pa:'ਮੂੰਹ (Mooh)',                m:'Opening used for eating, speaking and breathing.'},
    {id:'m9', q:'Tongue',           pa:'ਜੀਭ (Jeebh)',               m:'Muscular organ in the mouth used for tasting, chewing and speaking.'},
    {id:'m10',q:'Teeth / Tooth',    pa:'ਦੰਦ (Dund)',                 m:'Hard structures in the mouth used for chewing food.'},
    {id:'m11',q:'Throat',           pa:'ਗਲਾ (Ghula)',                m:'Passage connecting the mouth to the esophagus and trachea.'},
    {id:'m12',q:'Neck',             pa:'ਧੌਣ / ਗਰਦਨ (Thon / Gardun)',m:'Part connecting head to torso; contains cervical spine.'},
    {id:'m13',q:'Shoulder',         pa:'ਮੋਢਾ (Moda)',               m:'Joint connecting the arm to the torso; allows wide range of motion.'},
    {id:'m14',q:'Arm',              pa:'ਬਾਂਹ (Banh)',               m:'Upper limb from shoulder to hand.'},
    {id:'m15',q:'Elbow',            pa:'ਕੂਹਣੀ (Kooni)',             m:'Joint between upper arm and forearm.'},
    {id:'m16',q:'Wrist',            pa:'ਗੁੱਟ (Guth)',               m:'Joint connecting the hand to the forearm; common site of sprains.'},
    {id:'m17',q:'Hand',             pa:'ਹੱਥ (Hath)',                m:'End part of the arm beyond the wrist; includes fingers and thumb.'},
    {id:'m18',q:'Finger',           pa:'ਉਂਗਲ (Ungal)',              m:'One of the digits of the hand.'},
    {id:'m19',q:'Palm',             pa:'ਹਥੇਲੀ (Hatheli)',           m:'Inner surface of the hand between wrist and fingers.'},
    {id:'m20',q:'Chest',            pa:'ਹਿੱਕ / ਛਾਤੀ (Hikh / Shaathi)', m:'Front upper torso housing the heart and lungs.'},
    {id:'m21',q:'Heart',            pa:'ਦਿਲ (Dil)',                 m:'Muscular organ that pumps blood throughout the body.'},
    {id:'m22',q:'Lung(s)',          pa:'ਫੇਫੜੇ (Phepharey)',         m:'Respiratory organs that exchange oxygen and carbon dioxide.'},
    {id:'m23',q:'Artery / Vein',    pa:'ਨਾੜੀ (Nari)',               m:'Blood vessels carrying blood to/from the heart.'},
    {id:'m24',q:'Blood',            pa:'ਖੂਨ (Khoon)',               m:'Red fluid circulated by the heart carrying oxygen and nutrients.'},
    {id:'m25',q:'Abdomen',          pa:'ਪੇਟ / ਢਿੱਡ (Peyth / Tid)',  m:'Area between chest and pelvis containing digestive organs.'},
    {id:'m26',q:'Stomach',          pa:'ਢਿੱਡ / ਮਿਹਦਾ (Tid / Mihda)',m:'Digestive organ that breaks down food with acid and enzymes.'},
    {id:'m27',q:'Liver',            pa:'ਜਿਗਰ (Jigar)',              m:'Largest internal organ; filters blood, produces bile, aids digestion.'},
    {id:'m28',q:'Kidney',           pa:'ਗੁਰਦਾ (Gurda)',             m:'Bean-shaped organs that filter blood and produce urine.'},
    {id:'m29',q:'Intestine',        pa:'ਅੰਤੜੀ (Antareeyan)',         m:'Long tube below stomach; absorbs nutrients and water from food.'},
    {id:'m30',q:'Spleen',           pa:'ਤਿੱਲੀ (Thili)',             m:'Organ near stomach that filters blood and supports immune function.'},
    {id:'m31',q:'Back',             pa:'ਪਿੱਠ (Pit)',                m:'Rear surface of the torso from neck to buttocks.'},
    {id:'m32',q:'Spine',            pa:'ਰੀੜ੍ਹ ਦੀ ਹੱਡੀ (Reer de haddi)', m:'Column of vertebrae supporting posture and protecting the spinal cord.'},
    {id:'m33',q:'Hip',              pa:'ਚੂਲਾ (Choola)',              m:'Ball-and-socket joint connecting the leg to the pelvis.'},
    {id:'m34',q:'Thigh',            pa:'ਪੱਟ (Puth)',                m:'Upper part of the leg between hip and knee.'},
    {id:'m35',q:'Knee',             pa:'ਗੋਡਾ (Goda)',               m:'Joint between upper and lower leg; largest joint in the body.'},
    {id:'m36',q:'Leg',              pa:'ਲੱਤ (Lath)',                m:'Lower limb from hip to foot.'},
    {id:'m37',q:'Ankle',            pa:'ਗਿੱਟਾ (Gita)',              m:'Joint connecting lower leg to the foot; common site of sprains.'},
    {id:'m38',q:'Foot',             pa:'ਪੈਰ (Pahr)',                m:'Lowest part of the leg; used for standing, walking and balance.'},
    {id:'m39',q:'Toe',              pa:'ਅੰਗੂਠਾ (Angoota)',          m:'Digit of the foot; big toe is the largest.'},
    {id:'m40',q:'Heel',             pa:'ਅੱਡੀ (Adi)',                m:'Rounded back and bottom of the foot.'},
    {id:'m41',q:'Bone',             pa:'ਹੱਡੀ (Hadi)',               m:'Hard tissue forming the skeleton; supports and protects the body.'},
    {id:'m42',q:'Muscle',           pa:'ਮਾਸ (Mas)',                  m:'Tissue that contracts to produce movement.'},
    {id:'m43',q:'Skin',             pa:'ਚਮੜੀ (Chamari)',            m:'Outer protective covering of the body.'},
    {id:'m44',q:'Joints',           pa:'ਜੋੜ (Jorr)',                m:'Connection between two bones; allows movement.'},
    {id:'m45',q:'Nerve',            pa:'ਨਸਾਂ (Nasan)',               m:'Fibers carrying signals between the brain and body parts.'},
    {id:'m46',q:'Trachea / Airway', pa:'ਸਾਹ ਨਾਲੀ (Saah nali)',     m:'Tube carrying air from the throat to the lungs.'},
    {id:'m47',q:'Esophagus',        pa:'ਅਨਾਦਰ (Anadar)',            m:'Tube carrying food from the throat to the stomach.'},
    {id:'m48',q:'Lips',             pa:'ਬੁੱਲ੍ਹ (Bull)',             m:'Fleshy edges of the mouth opening.'},
    {id:'m49',q:'Cheeks',           pa:'ਗੱਲ੍ਹ (Gallan)',            m:'Sides of the face below the eyes.'},
    {id:'m50',q:'Chin',             pa:'ਠੋਡੀ (Thodi)',              m:'Lower part of the face below the mouth.'},

    // ── Symptoms & Pain Description ──
    {id:'m51',q:'Pain',             pa:'ਦਰਦ (Dard)',                 m:'Unpleasant sensation signalling tissue damage or illness.'},
    {id:'m52',q:'Sharp pain',       pa:'ਤਿੱਖੀ ਦਰਦ (Thikee dard)',  m:'Intense, stabbing pain that is sudden in onset.'},
    {id:'m53',q:'Dull pain',        pa:'ਸੁਸਤ ਦਰਦ (Susath dard)',    m:'A low-grade, aching or throbbing pain.'},
    {id:'m54',q:'Numbness',         pa:'ਸੁੰਨ (Sun)',                 m:'Loss of sensation in a body part; often in hands or feet.'},
    {id:'m55',q:'Tingling',         pa:'ਚੀਸਾਂ ਪੈਣੀਆਂ (Cheesa panea)', m:"Pins-and-needles sensation; often from nerve compression."},
    {id:'m56',q:'Swelling',         pa:'ਸੋਜ (Soj)',                 m:'Enlargement of a body part due to fluid or inflammation.'},
    {id:'m57',q:'Itch',             pa:'ਖੁਰਕ (Khurk)',              m:'Irritating skin sensation causing desire to scratch.'},

    // ── Constitutional Symptoms ──
    {id:'m58',q:'Fever',            pa:'ਬੁਖ਼ਾਰ (Bukhaar)',           m:'Body temperature above 38°C; usually a sign of infection.'},
    {id:'m59',q:'Chills',           pa:'ਠੰਢ (Tund)',                 m:'Feeling cold with shivering; often accompanies fever.'},
    {id:'m60',q:'Nausea',           pa:'ਉਲਟੀ ਆਉਂਦੀ (Ulti ohndi)',    m:'Feeling of wanting to vomit.'},
    {id:'m61',q:'Vomiting',         pa:'ਉਲਟੀ (Ulti)',               m:'Forceful expulsion of stomach contents through the mouth.'},
    {id:'m62',q:'Weight loss',      pa:'ਭਾਰ ਘੱਟਣਾ (Paar kutna)',     m:'Unintentional reduction in body weight; may signal illness.'},
    {id:'m63',q:'Decreased appetite', pa:'ਭੁੱਖ ਘੱਟ ਗਈ (Pukh kut gayee)', m:'Reduced desire to eat; common with many illnesses.'},
    {id:'m64',q:'Fatigue / Weakness', pa:'ਕਮਜ਼ੋਰੀ (Kumzori)',       m:'Extreme tiredness not relieved by rest.'},

    // ── Cardiology (CCHI) ──
    {id:'m65',q:'Heart disease',    pa:'ਦਿਲ ਦੀ ਬਿਮਾਰੀ (Dil di bimari)', m:'Conditions affecting the heart\'s structure and function.'},
    {id:'m66',q:'Heart attack',     pa:'ਦਿਲ ਦਾ ਦੌਰਾ (Dil da daura)', m:'Blockage of blood flow to the heart muscle; medical emergency.'},
    {id:'m67',q:'Cardiac Arrest',   pa:'ਦਿਲ ਦੀ ਗਤੀ ਰੁਕਣਾ (Dil di gati rukna)', m:'Sudden stopping of the heart; requires immediate CPR.'},
    {id:'m68',q:'Palpitations',     pa:'ਦਿਲ ਦੀ ਧੜਕਣ (Dil di darkhan)', m:'Awareness of heartbeat — racing, pounding or irregular.'},
    {id:'m69',q:'High Blood Pressure', pa:'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਵਧਣਾ (Blood pressure vadna)', m:'Persistently elevated blood pressure; major risk factor for stroke and heart disease.'},
    {id:'m70',q:'Chest Pain',       pa:'ਛਾਤੀ ਵਿੱਚ ਦਰਦ (Shaathi vich dard)', m:'Pain or pressure in the chest; may indicate heart or lung problems.'},

    // ── Respirology ──
    {id:'m71',q:'Shortness of Breath', pa:'ਸਾਹ ਚੜ੍ਹਦਾ (Saah charda)', m:'Difficulty breathing; can occur with heart disease, asthma or anxiety.'},
    {id:'m72',q:'Asthma',           pa:'ਦਮਾ (Dama)',                 m:'Chronic condition causing airway inflammation and breathing difficulty.'},
    {id:'m73',q:'Cough',            pa:'ਖੰਘ (Khang)',                m:'Sudden expulsion of air from the lungs to clear the airway.'},

    // ── Neurology ──
    {id:'m74',q:'Stroke',           pa:'ਦੌਰਾ ਪਿਆ (Dora piha)',        m:'Sudden interruption of blood supply to the brain; causes weakness or paralysis.'},
    {id:'m75',q:'Seizure',          pa:'ਮਿਰਗੀ (Mirgie)',              m:'Sudden electrical disturbance in the brain causing convulsions.'},
    {id:'m76',q:'Headache',         pa:'ਸਿਰ ਵਿੱਚ ਦਰਦ (Sir da dard)',  m:'Pain in the head or neck; can have many causes.'},

    // ── Mental Health (Psychiatry) ──
    {id:'m77',q:'Anxiety',          pa:'ਚਿੰਤਾ (Chintaa)',             m:'Excessive worry or fear interfering with daily life.'},
    {id:'m78',q:'Depression',       pa:'ਉਦਾਸੀ (Udaasi)',              m:'Persistent sadness, loss of interest and low energy.'},
    {id:'m79',q:'PTSD',             pa:'ਸਦਮੇ ਤੋਂ ਬਾਅਦ ਦੀ ਪ੍ਰਤੀਕਿਰਿਆ (PTSD)', m:'Condition after trauma causing flashbacks, nightmares and anxiety.'},

    // ── Emergency ──
    {id:'m80',q:'Fracture',         pa:'ਹੱਡੀ ਟੁੱਟਣਾ / ਤੇਰ (Haddi tuttna / Thayr)', m:'A break or crack in a bone.'},
    {id:'m81',q:'Sprain',           pa:'ਮੋਚ (Moch)',                 m:'Stretching or tearing of a ligament around a joint.'},
    {id:'m82',q:'Bruise',           pa:'ਭੰਗ (Bhang)',                m:'Skin discolouration from bleeding under the skin after injury.'},
    {id:'m83',q:'CPR',              pa:'ਛਾਤੀ / ਦਿਲ ਨੂੰ ਨੱਪਣਾ (Shaathi / Dil nu nupna)', m:'Life-saving technique using chest compressions and rescue breathing.'},
    {id:'m84',q:'Intubation',       pa:'ਸਾਹ ਦੀ ਨਾਲੀ ਪਾਉਣੀ (Saah de nali pohni)', m:'Inserting a tube into the airway to help a patient breathe.'},

    // ── Gastrointestinal ──
    {id:'m85',q:'Constipation',     pa:'ਕਬਜ਼ (Kabji)',               m:'Difficulty passing stools; fewer than 3 bowel movements per week.'},
    {id:'m86',q:'Diarrhea',         pa:'ਟਟੀਆਂ (Tuttian)',            m:'Loose or watery stools occurring more than 3 times a day.'},
    {id:'m87',q:'Ulcer',            pa:'ਫੋੜਾ (Fora)',                m:'Open sore on the lining of the stomach or small intestine.'},
    {id:'m88',q:'Heartburn',        pa:'ਛਾਤੀ ਵਿੱਚ ਜਲਨ (Shaathi vich jalan)', m:'Burning sensation in the chest from stomach acid rising into the esophagus.'},
    {id:'m89',q:'Jaundice',         pa:'ਪੀਲੀਆ (Peeliah)',           m:'Yellowing of skin and eyes from excess bilirubin; signals liver problems.'},

    // ── Maternal & Child ──
    {id:'m90',q:'Pregnancy',        pa:'ਗਰਭ (Garbh)',                m:'Period of fetal development in the womb; typically 40 weeks.'},
    {id:'m91',q:'Miscarriage',      pa:'ਗਰਭਪਾਤ (Garbhpaat)',         m:'Spontaneous loss of pregnancy before 20 weeks.'},
    {id:'m92',q:'Childbirth / Labour', pa:'ਜਣੇਪਾ (Janepaa)',         m:'Contractions and process of giving birth.'},
    {id:'m93',q:'Breast',           pa:'ਛਾਤੀ (Shaathi)',            m:'Mammary gland on the chest; used for breastfeeding.'},

    // ── General / Family Medicine ──
    {id:'m94',q:'Diabetes',         pa:'ਸ਼ੂਗਰ ਦੀ ਬਿਮਾਰੀ (Shoogar di bimari)', m:'Condition where blood sugar levels are too high; managed with diet or medication.'},
    {id:'m95',q:'Arthritis',        pa:'ਜੋੜਾਂ ਦਾ ਦਰਦ (Jorran da dard)', m:'Inflammation and pain in one or more joints; reduces mobility.'},
    {id:'m96',q:'Infection',        pa:'ਸੰਕ੍ਰਮਣ (Sankraman)',          m:'Invasion of body by bacteria, viruses or fungi causing illness.'},
    {id:'m97',q:'Rash',             pa:'ਕਾਜ਼ (Kaaz)',                m:'Area of reddened or irritated skin; can signal allergy or infection.'},
    {id:'m98',q:'Allergy',          pa:'ਐਲਰਜੀ (Allergy)',             m:'Abnormal body reaction to a substance — food, pollen or medication.'},
    {id:'m99',q:'Medications / Pills', pa:'ਦਵਾਈਆਂ / ਗੋਲੀਆਂ (Duwayeea / Goliya)', m:'Drugs prescribed or taken to treat or prevent illness.'},
    {id:'m100',q:'Blood Test',      pa:'ਖੂਨ ਦੀ ਜਾਂਚ (Khoon di jaanch)', m:'Laboratory test of a blood sample to check health indicators.'},

    // ── Dermatology / ENT ──
    {id:'m101',q:'Acne',            pa:'ਫਿਣਸੀ (Fenceeyan)',           m:'Skin condition causing pimples, blackheads and cysts on the face and body.'},
    {id:'m102',q:'Nosebleed',       pa:'ਨਕਸੀਰ (Nakseer)',             m:'Bleeding from the nose; usually from a broken blood vessel.'},
    {id:'m103',q:'Earache',         pa:'ਕੰਨ ਦੁਖਦਾ (Kun dukh da)',      m:'Pain in the ear; often from infection or fluid buildup.'},
    {id:'m104',q:'Sore Throat',     pa:'ਗਲੇ ਵਿੱਚ ਖਰਾਸ਼ (Galay vich kharash)', m:'Pain or irritation in the throat; often from virus or infection.'},
    {id:'m105',q:'Flu',             pa:'ਜੁਕਾਮ (Jukam)',              m:'Viral infection causing fever, body aches, cough and congestion.'},

    // ── Procedures & Care ──
    {id:'m106',q:'Surgery',         pa:'ਆਪ੍ਰੇਸ਼ਨ (Operation)',          m:'Medical procedure involving incision to treat disease or injury.'},
    {id:'m107',q:'Prescription',    pa:'ਦਵਾਈ ਦਾ ਨੁਸਖ਼ਾ (Davaai da nuskha)', m:'Written order from a doctor for a specific medication.'},
    {id:'m108',q:'Immunization / Vaccine', pa:'ਟੀਕਾ (Teeka)',           m:'Injection to stimulate immunity and prevent specific infectious diseases.'},
    {id:'m109',q:'Intensive Care',  pa:'ਬਹੁਤ ਬਿਮਾਰ ਦਾ ਯੂਨਿਟ (Bale bhimar da unit)', m:'Specialized hospital unit for critically ill patients needing continuous monitoring.'},
    {id:'m110',q:'Intravenous (IV)', pa:'ਗਲੂਕੋਜ਼ / ਨਾੜੀ ਰਾਹੀਂ (Glucose / Nari raahi)', m:'Delivering fluids or medications directly into a vein.'},
  ],

  // ── IRB / REFUGEE (20 cards) ─────────────────────────────────────────────
  irb: [
    {id:'i1', q:'Non-Refoulement',           pa:'ਵਾਪਸ ਨਾ ਕਰਨਾ (Vaapas na karna)',               m:'International principle of not returning a refugee to a country where they face persecution.'},
    {id:'i2', q:'Convention Refugee',         pa:'ਕਨਵੈਨਸ਼ਨ ਸ਼ਰਨਾਰਥੀ (Convention sharnarthi)',   m:'Person with well-founded fear of persecution based on race, religion, nationality or political opinion.'},
    {id:'i3', q:'Basis of Claim (BOC)',       pa:'ਦਾਅਵੇ ਦਾ ਆਧਾਰ (Daave da aadhaar)',            m:'Key document filled by claimant describing why they left their country.'},
    {id:'i4', q:'PRRA',                       pa:'ਦੇਸ਼ ਨਿਕਾਲੇ ਤੋਂ ਪਹਿਲਾਂ ਖ਼ਤਰੇ ਦਾ ਮੁਲਾਂਕਣ',      m:'Pre-Removal Risk Assessment — assessment of risks if returned before removal.'},
    {id:'i5', q:'IFA',                        pa:'ਅੰਦਰੂਨੀ ਉਡਾਣ ਵਿਕਲਪ (IFA)',                  m:'Internal Flight Alternative — whether claimant could safely live in another part of their country.'},
    {id:'i6', q:'Well-Founded Fear',          pa:'ਵਾਜਬ ਡਰ (Vaajab dar)',                         m:'Fear of persecution with both objective evidence and subjective experience.'},
    {id:'i7', q:'Claimant',                   pa:'ਦਾਅਵੇਦਾਰ (Daavedar)',                          m:'Person applying for refugee protection in Canada.'},
    {id:'i8', q:'Detention',                  pa:'ਨਜ਼ਰਬੰਦੀ (Nazarbandi)',                        m:'Holding a person in custody during an immigration investigation.'},
    {id:'i9', q:'Removal Order',              pa:'ਦੇਸ਼ ਨਿਕਾਲਾ ਹੁਕਮ (Desh nikalaa hukam)',       m:'Official order requiring a person to leave Canada.'},
    {id:'i10',q:'RAD',                        pa:'ਸ਼ਰਨਾਰਥੀ ਅਪੀਲ ਡਿਵੀਜ਼ਨ',                      m:'Refugee Appeal Division — IRB division that reviews decisions of the RPD.'},
    {id:'i11',q:'RPD',                        pa:'ਸ਼ਰਨਾਰਥੀ ਸੁਰੱਖਿਆ ਡਿਵੀਜ਼ਨ',                   m:'Refugee Protection Division — IRB division conducting first-instance hearings.'},
    {id:'i12',q:'UNHCR',                      pa:'ਸੰਯੁਕਤ ਰਾਸ਼ਟਰ ਸ਼ਰਨਾਰਥੀ ਏਜੰਸੀ',               m:'United Nations High Commissioner for Refugees; protects and supports refugees worldwide.'},
    {id:'i13',q:'Credibility',                pa:'ਭਰੋਸੇਯੋਗਤਾ (Bharoseyogtaa)',                  m:'Assessment of the believability of a claimant\'s testimony.'},
    {id:'i14',q:'Natural Justice',            pa:'ਕੁਦਰਤੀ ਨਿਆਂ (Kudrati nyaay)',                 m:'Principle of a fair hearing and unbiased decision-making.'},
    {id:'i15',q:'De Novo Hearing',            pa:'ਨਵੀਂ ਸੁਣਵਾਈ (Nayi sunvayi)',                 m:'A fresh hearing conducted independently of any previous decision.'},
    {id:'i16',q:'Cessation',                  pa:'ਸ਼ਰਨਾਰਥੀ ਦਰਜਾ ਖਤਮ',                          m:'Ending of refugee status when circumstances in country of origin have changed.'},
    {id:'i17',q:'Disclosure',                 pa:'ਖੁਲਾਸਾ (Khulaasa)',                           m:'Providing documents to all parties before a hearing.'},
    {id:'i18',q:'Fear of Persecution',        pa:'ਜ਼ੁਲਮ ਦਾ ਡਰ (Zulam da dar)',                  m:'Well-founded fear of persecution in country of origin.'},
    {id:'i19',q:'Stay of Removal',            pa:'ਦੇਸ਼ ਨਿਕਾਲੇ ਦੀ ਰੋਕ (Desh nikalay di rok)',    m:'Temporary suspension of removal proceedings.'},
    {id:'i20',q:'Standard of Proof',          pa:'ਸਬੂਤ ਦਾ ਮਿਆਰ (Saboot da miyaar)',             m:'The level of evidence required to prove a claim.'},
  ],
};
