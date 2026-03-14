/**
 * AutiCare AI — Offline Keyword-Based Parenting Assistant
 *
 * A fully local, rule-based assistant that analyses parent-typed messages for
 * autism-related behavioural keywords and returns structured guidance.
 * No external APIs, no network calls — works 100 % offline.
 *
 * DISCLAIMER: This assistant does NOT diagnose autism or any other condition.
 * It is intended solely for educational guidance. Always consult a qualified
 * healthcare professional for clinical evaluation.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface KeywordEntry {
  /** All keywords / phrases that trigger this category (checked via includes). */
  keywords: string[];
  /** The structured response returned when any keyword matches. */
  response: string;
}

// ---------------------------------------------------------------------------
// Keyword → Response Map
// ---------------------------------------------------------------------------

const KEYWORD_RESPONSES: KeywordEntry[] = [
  // ── 1. Eating / Picky Eating ────────────────────────────────────────────
  {
    keywords: [
      "picky eater", "picky eating", "refuses food", "refuses to eat",
      "selective eating", "food texture", "soft food", "crunchy food",
      "won't try food", "limited diet", "avoids food", "gagging food",
      "spitting food", "food sensitivity", "sensory food", "sensory food issues",
      "won't eat", "doesn't eat", "not eating", "eating problem",
      "eating issue", "eating habit", "only eats", "same food",
      "hate food", "hates food", "texture of food", "food refusal",
      "feeding problem", "feeding issue", "feeding difficulty",
      "mealtime", "meal time", "dinner struggle", "lunch struggle",
      "breakfast struggle", "throws food", "gags on food", "spits out food",
      "chewing problem", "swallowing problem", "oral sensitivity",
      "restricted diet", "narrow diet", "food aversion", "food avoidance",
      "food selectivity", "eats very little", "barely eats",
      "doesn't chew", "doesn't swallow", "mushy food", "slimy food",
      "mixed texture", "brand specific", "only one brand",
      "won't try anything new", "afraid of new food", "fear of food",
      "snack only", "only snacks", "no vegetables", "won't eat vegetables",
      "hates vegetables", "no fruit", "won't eat fruit", "eats junk food only",
      "food meltdown", "cries at mealtime", "food tantrum",
    ],
    response: `**Understanding the Behavior**
Many children on the autism spectrum have a very restricted diet, often limited to specific textures, colors, brands, or temperatures of food. This is rarely about being "stubborn" — sensory sensitivities can make certain food textures feel genuinely unbearable, and the unpredictability of new foods can trigger anxiety.

**Possible Causes**
• Oral sensory sensitivity — textures like mushy, crunchy, or mixed-texture foods can feel overwhelming in the mouth.
• Visual rigidity — food must look "right" (correct color, shape, brand packaging) to feel safe.
• Interoception differences — some children have difficulty recognizing hunger or fullness cues, affecting their eating patterns.
• Past negative experiences — a single gagging or choking incident can make a child fearful of similar foods.

**Suggested Strategies**
1. **Don't force new foods.** Pressure increases anxiety around mealtimes. Instead, place a tiny amount of new food on the plate alongside preferred foods with no expectation to eat it.
2. **Explore food through play.** Let your child touch, smell, squish, and explore new foods without any pressure to taste them. Familiarity reduces fear over time.
3. **Keep mealtimes calm and routine.** Eat at the same times, same place, with minimal distractions to create a predictable, low-stress environment.
4. **Use food chaining.** Gradually introduce foods that are similar to what your child already accepts (e.g., if they eat fries, try a sweet-potato fry next).
5. **Consult a feeding therapist.** Occupational therapists or speech therapists with feeding specialization can address oral motor and sensory aspects systematically.

**When to Seek Professional Help**
If your child's restricted diet is affecting their growth, nutrition, or health, if they are losing weight, or if mealtimes consistently cause extreme distress for the family, seek guidance from a pediatrician and a feeding specialist.`,
  },

  // ── 2. Eye Contact ─────────────────────────────────────────────────────
  {
    keywords: [
      "eye contact", "avoids eye contact", "no eye contact",
      "not looking at me", "won't look at me", "doesn't look at people",
      "looking away", "avoids gaze", "difficulty with eye contact",
      "avoids looking", "doesn't make eye contact", "never looks at me",
      "won't look me in the eye", "averts gaze", "averts eyes",
      "looks away when talking", "looks away when i talk",
      "doesn't look at faces", "won't look at faces",
      "gazes past me", "looks through me", "stares past",
      "fleeting eye contact", "brief eye contact", "glances away",
      "uncomfortable with eye contact", "refuses to look",
      "doesn't look when spoken to", "looks down",
      "looks at the floor", "avoids face", "turns head away",
      "won't focus on my face", "eye avoidance", "gaze avoidance",
      "trouble with eye contact", "problem with eye contact",
      "lack of eye contact", "poor eye contact", "limited eye contact",
      "doesn't hold eye contact", "breaks eye contact immediately",
    ],
    response: `**Understanding the Behavior**
Eye contact differences are one of the most commonly observed traits in children on the autism spectrum. Your child may look away, seem to "look through" people, or make brief eye contact before quickly shifting their gaze. This does not mean they are being rude or uninterested — they may find direct eye contact overwhelming or difficult to process alongside other social information.

**Possible Causes**
• Sensory overload — sustained eye contact can feel intensely stimulating for some children on the spectrum.
• Difficulty with simultaneous processing — your child may actually listen and understand better when they are *not* looking directly at someone.
• Social communication differences — eye contact is a learned social convention, and children with autism may develop this skill on a different timeline.

**Suggested Strategies**
1. **Don't force it.** Demanding "look at me" can increase anxiety. Instead, get on your child's physical level and position yourself in their natural line of sight.
2. **Use preferred activities.** Engage in a favorite game or toy side-by-side; eye contact often emerges naturally during joyful interactions.
3. **Praise any glance.** When your child does look at you, respond warmly — "I love when you look at me!" — to positively reinforce the behavior.
4. **Try visual supports.** Holding an interesting object near your face while speaking can gently draw their gaze without pressure.

**When to Seek Professional Help**
If your child consistently avoids eye contact and also shows delays in speech, limited response to their name, or reduced social engagement, consider requesting an evaluation from a developmental pediatrician or child psychologist.`,
  },

  // ── 3. Not Responding to Name ──────────────────────────────────────────
  {
    keywords: [
      "respond to name", "doesn't respond to name", "does not respond to name",
      "ignores name", "doesn't react when called", "ignores when i call",
      "not answering when called", "doesn't look when called",
      "no reaction to name", "name response", "calling name",
      "doesn't respond when called", "won't answer to name",
      "ignores me when i call", "doesn't turn when called",
      "doesn't hear name", "seems deaf", "acts deaf", "acts like deaf",
      "doesn't notice when i call", "tune out", "tunes out",
      "tuning out", "in their own world", "in his own world",
      "in her own world", "doesn't acknowledge",
      "won't respond", "not responding", "won't react",
      "doesn't turn around", "oblivious when called",
      "doesn't come when called", "won't come when i call",
      "ignoring me", "not listening to me", "never listens",
      "doesn't listen", "doesn't pay attention when called",
      "no response when i say",
    ],
    response: `**Understanding the Behavior**
When a child does not consistently respond to their name, it can feel concerning. This is one of the early indicators that professionals look for during developmental screenings. Your child may not be ignoring you deliberately — they may process auditory information differently, or they may be deeply focused on something else.

**Possible Causes**
• Auditory processing differences — your child may hear their name but take longer to shift attention toward the source.
• Hyper-focus — children on the spectrum can become so absorbed in an activity that external sounds fade into the background.
• Developing joint attention skills — responding to a name requires recognizing it as socially meaningful, which is a skill that develops at different rates.

**Suggested Strategies**
1. **Reduce background noise.** Turn off the TV or music before calling your child's name so there are fewer competing sounds.
2. **Get close first.** Move near your child and gently touch their arm or shoulder before saying their name. This pairs a physical cue with the auditory one.
3. **Use a sing-song tone.** A varied, melodic voice can be more attention-grabbing than a flat or loud call.
4. **Reward every response.** The moment your child looks at you after hearing their name, smile, cheer, or offer a small reward to build the habit.

**When to Seek Professional Help**
If your child rarely or never responds to their name by 12 months, and especially if this is combined with limited babbling, gesturing, or social smiling, a developmental assessment is recommended.`,
  },

  // ── 4. Speech & Language Delay ─────────────────────────────────────────
  {
    keywords: [
      "speech delay", "not talking", "doesn't talk", "not speaking",
      "late talking", "slow speech", "no words", "few words",
      "communication delay", "language delay", "not saying words",
      "late talker", "nonverbal", "non-verbal", "can't speak",
      "won't speak", "stopped talking", "lost words", "regression",
      "language regression", "speech regression", "barely talks",
      "only babbles", "just babbles", "babbling only",
      "no sentences", "no phrases", "single words only",
      "doesn't form sentences", "unclear speech", "hard to understand",
      "unintelligible", "mumbles", "can't say words",
      "doesn't say mama", "doesn't say dada", "no first words",
      "speech problem", "speech issue", "speech difficulty",
      "language problem", "language issue", "can't communicate",
      "difficulty communicating", "communication problem",
      "communication issue", "doesn't express", "can't express",
      "verbal delay", "delayed speech", "delayed language",
      "doesn't use words", "won't use words", "mute",
      "selectively mute", "selective mutism", "echolalia",
      "repeats words", "repeats phrases", "parrots words",
      "echoes what i say", "scripts from tv", "tv scripts",
      "movie quotes only", "only repeats", "pronoun reversal",
      "mixes up pronouns", "says you instead of i",
    ],
    response: `**Understanding the Behavior**
Speech and language development varies widely among children, but when a child is significantly behind expected milestones, it is natural to feel worried. Some children on the autism spectrum are late talkers who eventually develop fluent language, while others may communicate primarily through gestures, pictures, or assistive devices — and all of these are valid forms of communication.

**Possible Causes**
• Motor-planning difficulties — the physical coordination required for speech (tongue, lips, breath control) may be challenging.
• Receptive vs. expressive gap — your child may understand far more than they can express verbally.
• Communication style differences — some children find non-verbal communication (pointing, leading you by the hand) more natural than spoken words.
• Echolalia as a learning stage — repeating words or phrases from others or from media can be a stepping stone to functional language.

**Suggested Strategies**
1. **Narrate your day.** Talk through everyday activities — "Now we are putting on shoes" — to immerse your child in language without requiring a response.
2. **Follow their lead.** If your child shows interest in something, name it enthusiastically. Motivated learning sticks better.
3. **Use visual supports.** Picture cards, communication boards, or AAC (Augmentative and Alternative Communication) apps can bridge the gap while verbal skills develop.
4. **Celebrate all communication.** Whether your child points, signs, uses a picture, or speaks a word, treat every attempt as meaningful communication.
5. **Read together daily.** Picture books with repetitive, simple text can encourage your child to fill in words or anticipate phrases.

**When to Seek Professional Help**
If your child has no words by 16 months, no two-word phrases by 24 months, or loses previously acquired speech at any age, seek evaluation from a speech-language pathologist as soon as possible. Early intervention makes a significant difference.`,
  },

  // ── 5. Repetitive Behaviors / Stimming ─────────────────────────────────
  {
    keywords: [
      "repetitive behavior", "repetitive behaviour", "hand flapping",
      "rocking", "spinning", "repeats movements", "repetitive movements",
      "stimming", "self stimulation", "flapping hands", "body rocking",
      "flapping", "flaps hands", "flaps arms", "arm flapping",
      "finger flicking", "finger flapping", "hand movements",
      "toe walking", "walks on toes", "lines up toys", "lining up",
      "lines things up", "arranges objects", "stacking",
      "obsessive stacking", "spins objects", "spins wheels",
      "stares at spinning", "watches wheels", "opening and closing",
      "opens and closes doors", "flicks lights", "light switch",
      "same movement", "does the same thing", "over and over",
      "again and again", "won't stop doing", "keeps doing",
      "head shaking", "head banging", "hits head",
      "rocks back and forth", "sways", "swaying",
      "jumping repeatedly", "bouncing", "bounces on toes",
      "hand posturing", "finger posturing", "unusual hand movements",
      "twists fingers", "wiggles fingers", "stim", "self-stim",
      "sensory seeking", "sensory need", "repetitive play",
      "plays the same way", "same game over and over",
      "restricted interests", "obsessive interest", "fixated on",
      "obsessed with", "only talks about one thing",
    ],
    response: `**Understanding the Behavior**
Repetitive behaviors — sometimes called "stimming" (self-stimulatory behavior) — include hand flapping, spinning, rocking, lining up objects, or repeating words and phrases. These movements serve an important purpose for your child: they help regulate sensory input, manage emotions, and sometimes express excitement or joy.

**Possible Causes**
• Sensory regulation — stimming can help a child feel calm when they are overwhelmed or provide stimulation when they feel under-stimulated.
• Emotional expression — many children flap or jump when they are excited or happy; it is their natural way of expressing big feelings.
• Predictability and comfort — repetitive actions create a sense of order and control in a world that may feel unpredictable.
• Focused interest — intense focus on specific objects or topics can be a source of genuine joy and deep learning.

**Suggested Strategies**
1. **Don't suppress it automatically.** Unless the behavior is harmful, stimming is a healthy coping mechanism. Focus on understanding *why* the child is stimming rather than stopping it.
2. **Offer alternatives when needed.** If a stim is disruptive (e.g., loud vocalizations in class), work with a therapist to find a socially acceptable substitute, like squeezing a stress ball.
3. **Create a sensory-friendly environment.** Provide sensory toys, fidget tools, and a quiet corner where your child can stim freely.
4. **Observe patterns.** Track when stimming increases — it may signal sensory overload, anxiety, or a need for a break.
5. **Channel intense interests.** If your child is fixated on a topic, use it as a bridge to learning and social connection.

**When to Seek Professional Help**
Consult a professional if the repetitive behaviors cause self-injury (such as head-banging), significantly interfere with daily activities, or seem to increase dramatically without an obvious trigger.`,
  },

  // ── 6. Playing Alone / Social Interaction ──────────────────────────────
  {
    keywords: [
      "plays alone", "prefers to play alone", "avoids other kids",
      "not social", "doesn't interact", "avoids interaction",
      "doesn't play with others", "social difficulty", "no friends",
      "solitary play", "antisocial", "withdrawn",
      "won't play with others", "always alone", "prefers being alone",
      "doesn't join in", "won't join group", "avoids groups",
      "parallel play", "plays beside", "plays next to but not with",
      "doesn't share", "can't make friends", "trouble making friends",
      "difficulty making friends", "no playmates", "rejected by peers",
      "bullied", "left out", "excluded", "doesn't fit in",
      "socially awkward", "social skills", "lacks social skills",
      "doesn't understand social cues", "misses social cues",
      "can't read body language", "doesn't share interests",
      "doesn't show things", "doesn't point", "no joint attention",
      "won't engage", "disengaged", "detached", "aloof",
      "in a bubble", "in own bubble", "prefers objects over people",
      "more interested in objects", "ignores children", "ignores peers",
      "doesn't wave", "doesn't say hi", "doesn't greet",
      "doesn't reciprocate", "one-sided play",
      "doesn't take turns", "turn taking", "can't take turns",
      "doesn't cooperate", "uncooperative in play",
    ],
    response: `**Understanding the Behavior**
Some children naturally prefer solitary play or parallel play (playing beside others without direct interaction). For children on the autism spectrum, social situations can be confusing, exhausting, or overwhelming because they may struggle to read social cues, understand unwritten social rules, or process the fast pace of group play.

**Possible Causes**
• Social communication challenges — your child may *want* to connect but not know how to initiate or join play.
• Sensory overload — group environments are often noisy and unpredictable, which can be draining for sensory-sensitive children.
• Preference for predictability — solitary play allows a child to control the pace and rules, which feels safe and enjoyable.
• Different play style — your child may engage in play that peers don't understand or share interest in.

**Suggested Strategies**
1. **Start with one peer.** Large groups can be overwhelming. Arrange brief, structured one-on-one playdates with a calm, patient child.
2. **Use shared interests.** If your child loves trains, find a peer who also likes trains. Shared interest is the strongest bridge to social connection.
3. **Teach social scripts.** Practice simple phrases — "Can I play?" or "Your turn, my turn" — through role-play at home before real situations.
4. **Respect their need for alone time.** Solitary play is not inherently bad. Ensure your child has quiet time to recharge, and gently introduce social opportunities at their pace.
5. **Model social interaction.** Narrate social exchanges: "Look, that child is waving — they want to say hello. Let's wave back!"

**When to Seek Professional Help**
If your child shows no interest in other children at all by age 2–3, does not engage in any form of pretend play, or seems distressed in all social situations, a developmental evaluation may be helpful.`,
  },

  // ── 7. Sensory Sensitivity (Sound / General) ──────────────────────────
  {
    keywords: [
      "sensitive to noise", "loud sounds", "covers ears", "hates loud noises",
      "sensory issues", "sound sensitivity", "noise sensitivity",
      "sensory overload", "bothered by sounds", "sensitive to sound",
      "loud noises", "afraid of sounds", "startled by noise",
      "auditory sensitivity", "noise bothers", "too loud",
      "can't handle noise", "overwhelmed by sound",
      "cries at loud noise", "screams at loud noise",
      "hates vacuum", "vacuum cleaner", "hates blender",
      "hates dryer", "hates hand dryer", "hates toilet flush",
      "hates fireworks", "hates thunder", "hates dogs barking",
      "hates music", "hates singing", "hates clapping",
      "plugs ears", "blocks ears", "hands over ears",
      "sensory processing", "sensory disorder", "sensory sensitivity",
      "hypersensitive", "hyper sensitive", "hyper-sensitive",
      "over sensitive", "oversensitive", "over-responsive",
      "tactile sensitivity", "touch sensitivity", "doesn't like being touched",
      "hates tags", "hates seams", "clothing sensitivity",
      "won't wear clothes", "only certain clothes",
      "sensitive to light", "bright lights", "hates bright lights",
      "squints", "avoids sunlight", "visual sensitivity",
      "sensitive to smell", "strong smells", "hates smells",
      "smell sensitivity", "sensory meltdown",
      "overwhelmed", "overstimulated", "over stimulated",
      "can't handle crowds", "hates crowds", "too much stimulation",
    ],
    response: `**Understanding the Behavior**
Children with sensory sensitivity may react strongly to sounds, textures, lights, or smells that others barely notice — a flushing toilet, a blender, fluorescent lighting, scratchy clothing, or even background chatter. They may cover their ears, cry, try to escape, or become anxious in anticipation of overwhelming environments. This is not a behavioral choice; their nervous system genuinely processes sensory input more intensely.

**Possible Causes**
• Sensory hypersensitivity — the brain amplifies sensory input, making average-level stimuli feel painfully intense.
• Difficulty filtering stimuli — neurotypical brains naturally filter background noise and sensation; some children cannot, so every input competes for attention equally.
• Anxiety association — if a child has had a frightening experience with a sensory trigger, they may develop anticipatory anxiety about similar situations.

**Suggested Strategies**
1. **Provide sensory tools.** Noise-reducing headphones, sunglasses, tag-free clothing, and weighted blankets can make environments much more manageable.
2. **Give advance warnings.** Before entering a stimulating environment, prepare your child: "It might be loud inside. You can wear your headphones or we can step outside if you need a break."
3. **Create a quiet retreat at home.** Designate a calm corner with soft lighting, cushions, and minimal noise where your child can decompress anytime.
4. **Gradual desensitization.** With the guidance of an occupational therapist, you can slowly and gently expose your child to tolerable levels of the trigger to build comfort over time.
5. **Validate their experience.** Saying "I know that feels too loud for you" is more helpful than "It's not that loud."

**When to Seek Professional Help**
If sensory sensitivity is severely limiting your child's ability to participate in school, family activities, or daily routines, consult an occupational therapist who specializes in sensory processing.`,
  },

  // ── 8. Meltdowns & Emotional Regulation ────────────────────────────────
  {
    keywords: [
      "meltdown", "tantrum", "emotional outburst", "screaming",
      "crying uncontrollably", "aggressive", "hitting", "biting",
      "throwing things", "anger", "angry", "rage", "loses control",
      "out of control", "emotional regulation", "can't calm down",
      "won't calm down", "inconsolable", "falls apart",
      "breaks down", "erupts", "explodes", "explosive behavior",
      "lashes out", "kicks", "punches", "slaps", "throws",
      "destroys things", "self harm", "self-harm", "hurts self",
      "hurts himself", "hurts herself", "bangs head",
      "head banging", "scratches self", "bites self",
      "emotional meltdown", "sensory meltdown",
      "cries for hours", "won't stop crying", "uncontrollable crying",
      "frustration", "frustrated", "gets frustrated easily",
      "low frustration tolerance", "gives up easily",
      "can't handle frustration", "overreacts", "over reacts",
      "disproportionate reaction", "big emotions",
      "difficulty with emotions", "emotional dysregulation",
      "mood swings", "unpredictable mood", "sudden outburst",
      "violent", "violent behavior", "violent behaviour",
    ],
    response: `**Understanding the Behavior**
Meltdowns are not tantrums. A tantrum is goal-directed ("I want candy"), while a meltdown is an involuntary response to overwhelming sensory, emotional, or cognitive input. During a meltdown, your child has genuinely lost the ability to self-regulate — they are not choosing to misbehave. Understanding this distinction is key to responding with empathy rather than punishment.

**Possible Causes**
• Sensory overload — too much noise, light, touch, or activity can push a child past their threshold.
• Unexpected changes — a disrupted routine or unmet expectation can trigger intense distress in children who rely on predictability.
• Communication frustration — when a child cannot express what they need or feel, the emotional pressure builds until it erupts.
• Accumulated stress — sometimes a meltdown at 5 PM is the result of holding it together all day at school.

**Suggested Strategies**
1. **Stay calm yourself.** Your calm presence is the most powerful de-escalation tool. Speak softly and move slowly.
2. **Reduce stimulation immediately.** Move to a quieter space, dim lights if possible, and remove unnecessary people from the area.
3. **Don't talk too much.** During peak meltdown, words can add to the overload. Use short phrases: "You're safe" or "I'm here."
4. **Create a meltdown plan.** Identify your child's warning signs (e.g., covering ears, pacing, tensing up) and intervene early with a calming strategy before the meltdown fully escalates.
5. **Debrief afterward.** Once your child is calm (not during the meltdown), gently talk about what happened and brainstorm coping strategies together.

**When to Seek Professional Help**
If meltdowns are frequent (multiple times daily), increasingly intense, involve self-injury or harm to others, or are significantly impacting family life, seek guidance from a behavioral therapist or developmental specialist.`,
  },

  // ── 9. Routine & Transitions ───────────────────────────────────────────
  {
    keywords: [
      "routine", "change in routine", "hates change", "rigid",
      "same routine", "transition", "transitions", "doesn't like change",
      "needs routine", "needs sameness", "inflexible", "inflexibility",
      "gets upset with change", "freaks out with change",
      "can't handle change", "won't accept change",
      "insists on sameness", "needs things the same",
      "upset when plans change", "disrupted routine",
      "schedule change", "doesn't adapt", "won't adapt",
      "trouble transitioning", "difficulty transitioning",
      "hard to transition", "can't switch activities",
      "won't stop activity", "doesn't want to leave",
      "leaving the house", "leaving the park", "leaving school",
      "won't leave", "stuck on activity", "fixated on activity",
      "same path", "same route", "same seat", "same order",
      "specific order", "has to be in order", "must be the same",
      "predictable", "needs predictability", "rituals",
      "ritualistic", "ritualistic behavior", "rigid thinking",
      "black and white thinking", "all or nothing",
      "can't be flexible", "won't try new things",
      "resists new activities", "new situation",
      "afraid of new places", "unfamiliar places",
      "adjustment", "adjustment problems",
    ],
    response: `**Understanding the Behavior**
Many children on the autism spectrum thrive on routine and predictability. They may insist on the same route to school, the same breakfast bowl, or the same bedtime sequence. Changes — even minor ones — can cause significant distress because routines provide a sense of safety and control in a world that can feel chaotic and unpredictable.

**Possible Causes**
• Need for predictability — when a child struggles to read social cues or anticipate what will happen next, routines become their anchor.
• Anxiety about the unknown — new situations lack the "script" that a child relies on, leading to fear and resistance.
• Executive function differences — shifting from one activity to another requires cognitive flexibility, which may develop at a different pace.

**Suggested Strategies**
1. **Use visual schedules.** A picture-based daily schedule allows your child to see what comes next and mentally prepare for transitions.
2. **Give advance warnings.** "In 5 minutes we will stop playing and start lunch." Use timers or countdown visuals to make time concrete.
3. **Introduce changes gradually.** If you need to change a routine, modify one small element at a time rather than overhauling everything at once.
4. **Create a transition object.** Let your child carry a favorite toy or comfort item when moving between activities — it provides continuity.
5. **Use "First-Then" language.** "First we put on shoes, then we go to the playground" gives clear structure to transitions.

**When to Seek Professional Help**
If rigidity around routines is causing severe distress, preventing participation in necessary activities (school, doctor visits), or leading to frequent meltdowns, an occupational therapist or behavioral specialist can help develop flexibility strategies.`,
  },

  // ── 10. Sleep Problems ─────────────────────────────────────────────────
  {
    keywords: [
      "sleep", "won't sleep", "not sleeping", "wakes up",
      "sleep problems", "bedtime", "insomnia", "night waking",
      "sleep issue", "sleep difficulty", "trouble sleeping",
      "can't fall asleep", "takes long to sleep", "hours to fall asleep",
      "resists bedtime", "fights bedtime", "bedtime battle",
      "bedtime struggle", "afraid of the dark", "scared at night",
      "nightmares", "night terrors", "screams at night",
      "wakes up screaming", "wakes up crying", "early waking",
      "wakes too early", "up at 4am", "up at 5am",
      "restless sleep", "tosses and turns", "fitful sleep",
      "co-sleeping", "only sleeps with me", "won't sleep alone",
      "needs me to sleep", "comes to our bed",
      "melatonin", "sleep schedule", "nap problems",
      "won't nap", "refuses nap", "overtired",
      "sleep regression", "irregular sleep", "erratic sleep",
      "hyperactive at bedtime", "wired at night", "second wind",
      "nocturnal", "stays up late", "night owl",
    ],
    response: `**Understanding the Behavior**
Sleep difficulties are very common in children on the autism spectrum — studies suggest up to 80% experience some form of sleep challenge. Your child may resist bedtime, take a long time to fall asleep, wake frequently during the night, or rise very early. Poor sleep affects mood, behavior, learning, and the entire family's well-being.

**Possible Causes**
• Melatonin production differences — some children on the spectrum produce melatonin on a delayed or irregular schedule.
• Sensory sensitivities — the feel of sheets, room temperature, background noises, or light leaks can prevent relaxation.
• Difficulty "switching off" — children who struggle with transitions may find the shift from wakefulness to sleep particularly hard.
• Anxiety — worries about the day or the next day can keep a child's mind active long past bedtime.

**Suggested Strategies**
1. **Create a consistent bedtime routine.** A predictable sequence (bath → pajamas → book → lights out) signals the brain that sleep is coming.
2. **Optimize the sleep environment.** Use blackout curtains, white noise machines, weighted blankets (if your child finds them calming), and comfortable, tag-free pajamas.
3. **Limit screens before bed.** Blue light from devices suppresses melatonin. Aim for a screen-free period of at least 30–60 minutes before bedtime.
4. **Use visual bedtime charts.** A picture-based sequence of the bedtime routine helps your child anticipate each step and feel in control.
5. **Consider calming sensory input.** A warm bath, gentle massage, or quiet music can help the nervous system wind down.

**When to Seek Professional Help**
If sleep problems persist despite consistent routines, or if your child sleeps very few hours and it is significantly impacting their daytime functioning, consult your pediatrician. They may recommend a sleep study or discuss melatonin supplementation.`,
  },

  // ── 11. Toilet Training / Potty Training ───────────────────────────────
  {
    keywords: [
      "potty", "potty training", "toilet training", "toilet",
      "diaper", "nappy", "not potty trained", "won't use toilet",
      "refuses toilet", "afraid of toilet", "scared of flushing",
      "won't poop on toilet", "won't pee on toilet",
      "holds pee", "holds poop", "constipation", "soiling",
      "accidents", "wetting", "bed wetting", "bedwetting",
      "enuresis", "encopresis", "bathroom issues",
      "bathroom anxiety", "won't go to bathroom",
    ],
    response: `**Understanding the Behavior**
Toilet training can take significantly longer for children on the autism spectrum. Challenges may include difficulty recognizing body signals (interoception), sensory aversions to the toilet environment (cold seat, loud flush, echoing bathroom), anxiety about change in routine, and communication barriers that prevent the child from expressing the need to go.

**Possible Causes**
• Interoception differences — your child may not clearly feel the body signals that indicate they need to use the toilet.
• Sensory aversions — the sound of flushing, the feel of the seat, or the echoing acoustics of a bathroom can be distressing.
• Routine disruption — using the toilet interrupts whatever the child is currently doing, which can feel like an unwelcome transition.
• Communication barriers — a child may not have the words or signs to say "I need to go."

**Suggested Strategies**
1. **Use a visual toilet schedule.** Show your child a step-by-step picture sequence of the entire process (walk in → pull down pants → sit → go → wipe → flush → wash hands).
2. **Address sensory issues first.** If the flush scares them, let them leave before flushing. If the seat is cold, use a padded child seat. If the room echoes, play soft music.
3. **Create a timed routine.** Take your child to the toilet at regular intervals (every 1–2 hours) to build the habit, rather than waiting for them to signal.
4. **Celebrate all progress.** Even sitting on the toilet for 5 seconds without going is progress worth praising.

**When to Seek Professional Help**
If your child is over 4 and showing no readiness for toilet training, or if they experience pain, chronic constipation, or significant distress, consult your pediatrician and consider working with an occupational therapist.`,
  },

  // ── 12. Anxiety & Fears ────────────────────────────────────────────────
  {
    keywords: [
      "anxiety", "anxious", "worried", "worries a lot",
      "scared", "fearful", "fear", "phobia", "afraid",
      "separation anxiety", "won't leave my side",
      "clings to me", "clingy", "nervous", "panic",
      "panic attack", "stressed", "stress",
      "school anxiety", "school refusal", "won't go to school",
      "afraid of school", "afraid of people", "afraid of strangers",
      "stranger anxiety", "social anxiety", "performance anxiety",
      "overthinking", "catastrophizing", "worst case",
      "what if", "constant worry", "can't relax",
      "tense", "on edge", "hypervigilant",
      "nail biting", "hair pulling", "skin picking",
      "nervous habits", "tics", "obsessive thoughts",
      "compulsive behavior", "ocd", "obsessive compulsive",
    ],
    response: `**Understanding the Behavior**
Anxiety is extremely common in children on the autism spectrum — some studies estimate that up to 40–50% of autistic children experience significant anxiety. The world can feel unpredictable and confusing when social cues are hard to read and sensory input is intense, so anxiety is often a natural response to these challenges rather than a separate problem.

**Possible Causes**
• Unpredictability — difficulty understanding social expectations or what will happen next creates persistent worry.
• Sensory overload — anticipating overwhelming environments can trigger anxiety before even arriving.
• Past negative experiences — a difficult experience (being teased, a fire drill, a schedule change) can create lasting fear.
• Difficulty expressing feelings — when a child can't articulate their worry, it builds internally.

**Suggested Strategies**
1. **Validate their feelings.** "I can see you're worried. That makes sense." Validation reduces the emotional temperature.
2. **Use social stories.** Write or read short stories that describe upcoming events step-by-step so your child knows exactly what to expect.
3. **Teach calming strategies.** Deep breathing, counting to 10, squeezing a stress ball, or a "calm down" card can give your child tools to manage the feeling.
4. **Create a worry routine.** Set aside a brief "worry time" each day where your child can share what's on their mind, then redirect to something positive.
5. **Reduce uncertainty.** Visual schedules, advance warnings, and consistent routines all reduce the unpredictability that fuels anxiety.

**When to Seek Professional Help**
If anxiety is preventing your child from attending school, sleeping, eating, or participating in daily life, a child psychologist experienced in autism can provide Cognitive Behavioral Therapy (CBT) adapted for autistic children.`,
  },
];

// ---------------------------------------------------------------------------
// Disclaimer appended to every matched response
// ---------------------------------------------------------------------------

const DISCLAIMER =
  "\n\n*Disclaimer: This assistant provides general parenting guidance only. It does not diagnose autism or any other condition. Always consult qualified healthcare professionals for clinical advice.*";

// ---------------------------------------------------------------------------
// Fallback (no keyword match)
// ---------------------------------------------------------------------------

const FALLBACK_RESPONSE = `**Thank you for reaching out!**

I appreciate you sharing your concern. While I wasn't able to match your question to a specific topic in my knowledge base, here is some general guidance:

**Observe and Document**
Keep a journal noting specific behaviors, when they occur, how long they last, and any potential triggers. Patterns often become clearer over time and this record is invaluable for professionals.

**Trust Your Instincts**
You know your child best. If something feels different about their development, your concern is valid and worth exploring further.

**Connect with Professionals**
Consider reaching out to:
• Your child's pediatrician for a developmental screening
• A developmental pediatrician for specialized evaluation
• Early intervention services in your area (available for children under 3 in most regions)

**You Are Not Alone**
Many families share similar experiences. Local and online support groups for parents of children with autism can be an incredible source of practical advice and emotional support.

Try describing a specific behavior your child shows — for example, "my child avoids eye contact" or "my child doesn't respond to their name" — and I can offer more targeted guidance.

*Disclaimer: This assistant provides general parenting guidance only. It does not diagnose autism or any other condition. Always consult qualified healthcare professionals for clinical advice.*`;

// ---------------------------------------------------------------------------
// Public API — maintains the same function signature for the chat interface
// ---------------------------------------------------------------------------

/**
 * Analyse the user's message for known keywords and return a structured
 * parenting-guidance response.  Works entirely offline — no network calls.
 *
 * @param _chatHistory  Retained for interface compatibility (unused locally).
 * @param userMessage   The text the parent typed.
 * @returns A structured advice string.
 */
export async function sendMessage(
  _chatHistory: { role: "user" | "model"; text: string }[],
  userMessage: string
): Promise<string> {
  const input = userMessage.toLowerCase().trim();

  if (!input) {
    return "Please type a question or describe a behavior you'd like guidance on, and I'll do my best to help!";
  }

  // Check each keyword entry — first match wins
  for (const entry of KEYWORD_RESPONSES) {
    if (entry.keywords.some((keyword) => input.includes(keyword))) {
      return entry.response + DISCLAIMER;
    }
  }

  // No keyword matched
  return FALLBACK_RESPONSE;
}
