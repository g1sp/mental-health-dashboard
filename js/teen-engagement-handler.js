// Teen Engagement - Interactive learning & self-awareness
// Addresses: Why teens care to learn about root causes + practical experiments to try

class TeenEngagementHandler {
  constructor() {
    this.challenges = {
      spotTheAlgorithm: {
        title: 'Spot the Algorithm Challenge',
        icon: '🔍',
        category: 'Distorted Information',
        duration: '5 minutes',
        description: 'See how algorithms manipulate what you see',
        challenge: 'Scroll for 2 minutes on one social app. Count: how many posts are from people you actually know vs. suggested content? Notice the pattern.',
        reveal: 'Most feeds are 70%+ algorithm suggestions, not real friends. Algorithms show you what keeps you engaged—often negative or aspirational content.',
        insight: 'Your feed isn\'t reality. It\'s engineered to keep you scrolling.',
        followUp: 'After this challenge, your Coping Strategies tab has 3 skills to regain control of your feed.'
      },

      phonePresenceTest: {
        title: 'The Phone Presence Test',
        icon: '📱',
        category: 'Attention Fragmentation',
        duration: '10 minutes',
        description: 'Feel how your phone affects your focus',
        challenge: 'Put your phone somewhere visible but out of reach. Try to focus on homework or reading for 10 minutes. Did you think about your phone? Feel distracted?',
        reveal: 'Just having your phone nearby reduces cognitive capacity by ~10%. Your brain is subconsciously waiting for notifications.',
        insight: 'Your phone doesn\'t have to be in your hands to break your focus.',
        followUp: 'Try the "Phone-Free Hour" coping skill in your Coping Strategies tab.'
      },

      sleepExperiment: {
        title: 'The Sleep Experiment',
        icon: '😴',
        category: 'Attention Fragmentation',
        duration: '3 nights',
        description: 'See how phone use affects your sleep quality',
        challenge: 'For 3 nights: Night 1 - Use your phone 30 min before bed (normal). Night 2 - No phone 1 hour before bed. Night 3 - No phone 1 hour before bed again. Rate your sleep quality each morning (1-10).',
        reveal: 'Blue light from phones delays sleep by 30-90 minutes. Poor sleep directly impairs mood regulation and stress resilience.',
        insight: 'One night of better sleep might not feel different. But three nights in a row? You\'ll notice the difference.',
        followUp: 'Create a pre-sleep wind-down routine without screens.'
      },

      connectionAudit: {
        title: 'Your Connection Audit',
        icon: '🤝',
        category: 'Missing Protection',
        duration: '15 minutes',
        description: 'Understand the difference between real and surface-level connection',
        challenge: 'List 5 people you text regularly. For each, ask: Have I had a real conversation with them in the last week? (Not small talk—something meaningful.) How many real conversations are happening in person?',
        reveal: 'Real relationships—the kind where you talk about real things—are the strongest buffer against depression. Likes and texts aren\'t the same as real connection.',
        insight: 'Quality matters more than quantity. One real friend beats 1000 followers.',
        followUp: 'Schedule one in-person hangout this week. Make it phone-free.'
      },

      activityInventory: {
        title: 'Your Activity Inventory',
        icon: '🎯',
        category: 'Missing Protection',
        duration: '10 minutes',
        description: 'Discover what activities build your resilience',
        challenge: 'Think about what you do that makes you lose track of time—where you\'re completely absorbed. (Sports, music, art, gaming, writing, building, etc.) How often are you doing it? How much time does social media take by comparison?',
        reveal: 'Activities that create "flow"—complete focus and engagement—build competence and resilience. They\'re depression fighters. Screen time often replaces them.',
        insight: 'You feel better when you\'re building something, not just consuming.',
        followUp: 'Commit to 30 minutes of a flow activity this week. Notice how you feel after.'
      },

      anxietyNoticing: {
        title: 'The Anxiety Noticing Test',
        icon: '🧠',
        category: 'Avoidance Trap',
        duration: '15 minutes',
        description: 'Understand what\'s really driving your room avoidance',
        challenge: 'Over the next 3 days, notice the next 3 times you feel anxious about leaving your room or being around people. Write down: What triggered the anxiety? Is it about actual danger, or about being judged/perceived?',
        reveal: 'Most anxiety about leaving your room is social comparison/judgment anxiety, not real danger. Your brain is protecting you from imagined threats, not actual ones.',
        insight: 'You\'re avoiding imagined judgment, not real threat. That\'s important to know.',
        followUp: 'When you notice the anxiety next time, ask: "Is this real danger, or imagined judgment?" Usually it\'s the latter. That means you can do the thing.'
      },

      connectionVsScroll: {
        title: 'Connection vs Scroll Comparison',
        icon: '📱',
        category: 'Avoidance Trap',
        duration: '30 minutes + reflection',
        description: 'Feel the difference between real connection and scrolling',
        challenge: 'Spend 30 minutes with one real friend (coffee, walk, anything—in person). Then spend 30 minutes scrolling. After each, rate on 1-10: How energized do you feel? How lonely? How anxious?',
        reveal: 'Real connection provides both dopamine AND safety. Scrolling provides dopamine AND anxiety. Your brain is wired to know the difference.',
        insight: 'Scrolling feels easier but makes you feel worse. Real connection feels harder but makes you feel better.',
        followUp: 'When you\'re tempted to stay in and scroll, remember: the hard thing (leaving) is actually better for you than the easy thing (scrolling).'
      },

      skillAnxietyExperiment: {
        title: 'The Skill Anxiety Experiment',
        icon: '💪',
        category: 'Avoidance Trap',
        duration: '3 attempts over 1 week',
        description: 'Prove to yourself that anxiety decreases after you do the thing',
        challenge: 'Pick 3 mildly social things that make you nervous: order coffee, ask a question in class, text someone to hang out, go to one social event. Before you do it, rate your anxiety 1-10. After you do it, rate it again.',
        reveal: 'Every single time, anxiety BEFORE is higher than anxiety AFTER. This is the avoidance trap: you avoid because of pre-anxiety, but the post-anxiety is always lower. Avoidance keeps the pre-anxiety high.',
        insight: 'The dread is worse than the thing. Doing it proves that to yourself.',
        followUp: 'Next time you\'re avoiding something social, remember: once you do it, you\'ll feel better. The anticipation is the hardest part.'
      },

      roomVsWorldEnergy: {
        title: 'Room vs World Energy Tracker',
        icon: '⚡',
        category: 'Avoidance Trap',
        duration: '3 days',
        description: 'See how isolation affects your actual energy levels',
        challenge: 'For 3 days, track your energy/mood 3x daily (morning, afternoon, evening) on a scale of 1-10. On purpose, spend at least half each day in your room, and half outside/with people. Notice the pattern.',
        reveal: 'Staying in your room feels safe but it depletes your energy. Being outside and with people feels harder but restores your energy. Isolation creates a vicious cycle.',
        insight: 'Your room feels like a safe haven, but it\'s actually draining you. Leaving feels scary, but it recharges you.',
        followUp: 'When you\'re low energy and tempted to stay in, remember: you\'ll actually feel MORE energized by leaving than by staying.'
      }
    };

    this.parentStrategies = {
      noBlameConversation: {
        title: 'Start With "I Get It"',
        scenario: 'Your teen is defensive about phone use',
        approach: 'Lead with understanding, not lectures',
        template: `"I know your phone feels like your social life. I\'m not saying that\'s bad—connection matters. What I\'ve learned is that algorithms are literally designed to keep you hooked. It\'s not your fault. The good news? Once you understand how they work, you can take control back. Want to do a quick experiment together?"`,
        why: 'Teens tune out lectures. They listen when you validate first.',
        outcome: 'Opens dialogue instead of triggering defensiveness'
      },

      experimentTogether: {
        title: 'Do the Experiments Together',
        scenario: 'You want your teen to reduce phone use',
        approach: 'Make it collaborative, not punitive',
        template: `"I\'m trying to understand how algorithms work too. Let\'s do the Spot the Algorithm Challenge together this weekend. You scroll for 5 minutes on TikTok, I\'ll do Instagram. Let\'s see what we each get fed and compare notes. Winner buys the loser a smoothie."`,
        why: 'Shared discovery beats imposed rules. Plus, you\'ll learn alongside them.',
        outcome: 'Teen discovers the problem themselves instead of hearing it as criticism'
      },

      deviceFreeFamily: {
        title: 'Device-Free Family Times (Not "No Phones")',
        scenario: 'You want your family to disconnect together',
        approach: 'Reframe as bonding, not deprivation',
        template: `"Phones away for dinner—not because they\'re bad, but because I want to actually hear what\'s going on with you. We\'ve been present for everyone at school but not each other. Let\'s fix that. One meal a day. Your choice which one."`,
        why: 'Teens are more willing when it\'s about connection, not punishment.',
        outcome: 'Real conversation happens. Teens see actual relationship quality improves.'
      },

      phoneFreeBedroom: {
        title: 'Phone-Free Bedroom (Scientific Sell)',
        scenario: 'You want to establish sleep boundaries',
        approach: 'Lead with science, then the ask',
        template: `"Your brain needs 8-10 hours of sleep. But blue light from phones delays sleep by 30-90 minutes. That\'s why you\'re tired. Here\'s the deal: Phone charging station in the kitchen starting at 9pm. I\'ll keep mine out too. Your sleep quality will improve in about 3 days. Want to track it?"`,
        why: 'Teens respond to data and fairness. When you model it, they\'re more likely to do it.',
        outcome: 'Sleep improves → mood improves → behavior shifts naturally'
      },

      limitNotBan: {
        title: 'Time Limits, Not Bans',
        scenario: 'You want to reduce excessive usage',
        approach: 'Make the limit collaborative and achievable',
        template: `"Right now you\'re on your phone about 4 hours a day. Studies say 30-60 minutes is healthier. We\'re not going from 4 hours to 0—that\'s unrealistic. Let\'s go to 2 hours this week, 1.5 hours the next. Your phone has built-in time limits. You set it—I won\'t. What feels fair?"`,
        why: 'Gradual change sticks. When teens choose the limit, they own it.',
        outcome: 'Sustainable reduction without rebellion'
      },

      reframeBreaks: {
        title: 'Reframe Breaks as Reset Time',
        scenario: 'Your teen resists putting down their phone',
        approach: 'Position breaks as performance enhancement',
        template: `"Athletes take breaks between sets. Your brain works the same way. Every 90 minutes of focus needs 15 minutes of real rest (not another screen). When you take those breaks, you actually focus better after. Better grades, less anxiety. Try the 90/15 rule for a week."`,
        why: 'Teens care about performance. Frame screen breaks as productivity hacks.',
        outcome: 'Teen sees breaks as useful, not punishment'
      },

      addressFomo: {
        title: 'Address FOMO Directly',
        scenario: 'Your teen fears missing out',
        approach: 'Normalize that FOMO is engineered',
        template: `"FOMO is real. But it\'s engineered. Platforms make money when you stay on longer. They literally design notifications to trigger anxiety. You\'re not broken for feeling it—you\'re human. Let\'s use the \'Unfollow & Mute Strategy\' to reduce the anxiety triggers."`,
        why: 'Teens feel less alone when they know FOMO is a feature, not a flaw.',
        outcome: 'Teen gains agency over their anxiety instead of fighting invisible pressure'
      }
    };
  }

  // Teen-side: Show challenge UI
  showTeenChallenge(challengeKey) {
    const challenge = this.challenges[challengeKey];
    if (!challenge) return;

    const html = `
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-body">
          <div style="font-size: 3rem; margin-bottom: 1rem;">${challenge.icon}</div>
          <h3 class="card-title">${challenge.title}</h3>
          <p class="text-muted mb-2"><strong>Category:</strong> ${challenge.category}</p>
          <p class="text-muted mb-3"><strong>Time:</strong> ${challenge.duration}</p>
          <p class="lead">${challenge.description}</p>
          <hr>

          <div class="mb-4">
            <h5>Your Challenge:</h5>
            <p class="p-3 bg-light rounded">${challenge.challenge}</p>
          </div>

          <button class="btn btn-primary btn-lg w-100" data-bs-toggle="modal" data-bs-target="#challengeResultModal" onclick="teenEngagementHandler.showChallengeResult('${challengeKey}')">
            I Did It! Show Me the Result
          </button>
        </div>
      </div>
    `;

    document.getElementById('teenChallengeContainer').innerHTML = html;
  }

  // Show result after completion
  showChallengeResult(challengeKey) {
    const challenge = this.challenges[challengeKey];
    const categoryMap = {
      spotTheAlgorithm: 'distorted',
      phonePresenceTest: 'attention',
      sleepExperiment: 'attention',
      connectionAudit: 'protection',
      activityInventory: 'protection',
      anxietyNoticing: 'avoidance',
      connectionVsScroll: 'avoidance',
      skillAnxietyExperiment: 'avoidance',
      roomVsWorldEnergy: 'avoidance'
    };

    const stat = getPrevalenceStat(categoryMap[challengeKey]);

    const html = `
      <div class="mb-4 p-4 bg-light rounded">
        <h5 class="mb-3">✨ Here's What's Actually Happening:</h5>
        <p class="lead">${challenge.reveal}</p>
      </div>

      <div class="alert alert-info mb-4">
        <h5 class="mb-2">💡 The Key Insight:</h5>
        <p class="mb-0">${challenge.insight}</p>
      </div>

      <div class="alert alert-light border-start border-secondary ps-3 mb-4">
        <strong>📊 You're Not Alone:</strong>
        <p class="small mb-0 mt-2">${stat}</p>
      </div>

      <div class="card border-0 bg-success bg-opacity-10">
        <div class="card-body">
          <h5 class="card-title">What's Next?</h5>
          <p>${challenge.followUp}</p>
          <a href="#copingContent" class="btn btn-success" data-bs-toggle="tab" data-bs-target="#copingContent">Go to Coping Strategies →</a>
        </div>
      </div>
    `;

    document.getElementById('challengeResultBody').innerHTML = html;
  }

  // Parent-side: Show strategy with practical language
  showParentStrategy(strategyKey) {
    const strategy = this.parentStrategies[strategyKey];
    if (!strategy) return;

    const html = `
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-primary text-white">
          <h4 class="mb-0">${strategy.title}</h4>
        </div>
        <div class="card-body">
          <div class="mb-4">
            <h5>Situation:</h5>
            <p class="text-muted">${strategy.scenario}</p>
          </div>

          <div class="mb-4">
            <h5>Approach:</h5>
            <p>${strategy.approach}</p>
          </div>

          <div class="alert alert-light border">
            <h5>What to Say (Use This Template):</h5>
            <p class="font-monospace" style="background: #f8f9fa; padding: 1rem; border-radius: 6px; line-height: 1.8;">
              "${strategy.template}"
            </p>
          </div>

          <div class="mb-4">
            <h5>Why This Works:</h5>
            <p>${strategy.why}</p>
          </div>

          <div class="alert alert-success">
            <strong>Expected Outcome:</strong> ${strategy.outcome}
          </div>
        </div>
      </div>
    `;

    document.getElementById('parentStrategyContainer').innerHTML = html;
  }

  init() {
    // Attach to global scope
    window.teenEngagementHandler = this;
  }
}

const teenEngagementHandler = new TeenEngagementHandler();
teenEngagementHandler.init();
