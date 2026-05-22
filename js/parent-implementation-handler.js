// Parent Implementation Guide - Concrete action plans to reduce phone/internet use
// Addresses: How parents actually implement change without causing conflict

class ParentImplementationHandler {
  constructor() {
    this.implementations = {
      algorithmDrivenDistortion: {
        rootCause: 'Algorithm-Driven Distortion',
        summary: 'Your teen\'s feed is engineered to show them unrealistic comparisons',
        warningSignsParent: [
          'Teen says "Everyone else\'s life is better than mine"',
          'Constantly comparing themselves to peers on social media',
          'Spending 2+ hours daily on social media',
          'Showing anxiety about appearance or achievements after scrolling',
          'Withdrawing from activities they used to enjoy'
        ],
        interventions: [
          {
            action: 'Teach Media Literacy',
            script: `"Look, algorithms aren't neutral. They show you the most extreme, edited version of people's lives because that keeps you engaged. Let's follow 5 educational accounts and see if your feed feels different."`,
            implementation: 'Work together to unfollow comparison-heavy accounts, follow educational content instead',
            timeframe: '1 week',
            successMetric: 'Teen reports less anxiety after scrolling'
          },
          {
            action: 'Set Time Limits Together',
            script: `"Social media isn't bad—connection is important. But studies show 30-60 minutes per day is healthier. Your phone has built-in time limits. You pick the number. I'll do it too."`,
            implementation: 'Use phone\'s native time limit features. Start with current usage, reduce by 25% each week',
            timeframe: '4 weeks to reach 30-60 min/day',
            successMetric: 'Teen reaches 30-60 min/day without rebellion'
          },
          {
            action: 'Schedule Social Media Breaks',
            script: `"FOMO is real—but it's engineered. Let's try a 3-day social media detox this weekend. I'll join you. Notice how you feel on day 2 vs. day 1."`,
            implementation: 'Start with one weekend per month. Expand if teen is willing',
            timeframe: '1 weekend first attempt',
            successMetric: 'Teen reports feeling more present and less anxious'
          },
          {
            action: 'Create a Feed Audit Ritual',
            script: `"Once a week, let's look at the last 20 posts you saw. How many are from real friends? How many are algorithm? How many made you feel bad? Let's decide which accounts to mute."`,
            implementation: 'Monthly 10-minute review together. Mute or unfollow accounts that trigger comparison',
            timeframe: 'Ongoing, 1x per week',
            successMetric: 'Teen actively curates feed for mental health'
          }
        ]
      },

      attentionFragmentation: {
        rootCause: 'Attention Fragmentation',
        summary: 'Constant phone notifications prevent your teen from recovering from stress',
        warningSignsParent: [
          'Can\'t focus on homework without checking phone every 2-3 minutes',
          'Complains of being "tired all the time"',
          'Sleep schedule is irregular or very late',
          'Gets irritable when phone is taken away',
          'Reports feeling anxious when separated from phone'
        ],
        interventions: [
          {
            action: 'Create Device-Free Zones',
            script: `"During dinner and in bedrooms, phones stay out. Not because they're bad—because we need real connection and real sleep. I'll keep mine out too."`,
            implementation: 'Designate phone charging station in kitchen/common area. Phones go there at designated times',
            timeframe: 'Start with 1 hour at dinner, expand to full evenings',
            successMetric: 'Family reports better conversation quality'
          },
          {
            action: 'Implement Sleep Boundaries',
            script: `"Your brain needs 8-10 hours of sleep. Blue light from phones delays sleep by 30-90 minutes. Phone goes to the kitchen at 9pm. Track your sleep quality for 3 days—you'll see the difference."`,
            implementation: 'No phones in bedroom after 9pm (or 1 hour before bed). Use a regular alarm clock',
            timeframe: '3 nights minimum to see improvement',
            successMetric: 'Teen reports better sleep quality, wakes up less groggy'
          },
          {
            action: 'Use App Blockers During Focus Time',
            script: `"Your brain needs uninterrupted focus to work well. Let's block social apps during homework time. Not a punishment—a productivity hack."`,
            implementation: 'Use phone\'s built-in app time limit or third-party blocker (Freedom, Forest, etc.)',
            timeframe: '1-2 hours during homework/study',
            successMetric: 'Teen completes homework 20-30% faster'
          },
          {
            action: 'Practice the 90/15 Rule',
            script: `"Your brain can focus well for about 90 minutes, then it needs a real break. Not another screen—actual rest or movement. Every athlete does this. Let's try it."`,
            implementation: 'Structure study/work as 90 min focus + 15 min real break (walk, stretch, no screens)',
            timeframe: 'During homework sessions',
            successMetric: 'Teen reports better focus and less mental fatigue'
          }
        ]
      },

      missingProtection: {
        rootCause: 'Missing Real-World Protection',
        summary: 'Your teen\'s real relationships, activities, and physical movement are being replaced by screen time',
        warningSignsParent: [
          'Spends most free time on screens instead of with friends or hobbies',
          'Has given up sports, music, or activities they used to love',
          'Reports feeling lonely despite being "connected" on social media',
          'Complains of boredom but doesn\'t pursue offline activities',
          'Lacks real friendships (mostly online connections)'
        ],
        interventions: [
          {
            action: 'Reactivate One Offline Hobby',
            script: `"I noticed you used to love [music/art/sports]. You're good at it. Can we find a way to get you back to it? Not because you \'should\'—because it makes you feel capable."`,
            implementation: 'Sign up for a class, join a club, or schedule regular time for the activity',
            timeframe: '1-2 weeks to get started',
            successMetric: 'Teen spends 3-5 hours weekly on offline hobby'
          },
          {
            action: 'Schedule Device-Free Hangouts',
            script: `"Real friendships are built face-to-face. Can you schedule one hangout a week where phones stay in bags? You'll be surprised how much better you feel connected."`,
            implementation: 'Teen commits to 1-2 in-person hangouts weekly, phone-free or limited-use',
            timeframe: 'Ongoing weekly',
            successMetric: 'Teen reports feeling more connected to actual friends'
          },
          {
            action: 'Increase Physical Activity Together',
            script: `"Your mood is directly affected by how much you move. Let's do something active together this weekend—walk, hike, bike, whatever. No phones, no rush."`,
            implementation: 'Start with 30 min/day physical activity (walking counts), build to 1 hour',
            timeframe: 'Daily habit',
            successMetric: 'Teen reports improved mood, better sleep, more energy'
          },
          {
            action: 'Build Real Relationships',
            script: `"Online friends are fine, but real friendship is different. It\'s where people actually know you, not a curated version. Can you invest in one real friendship this semester?"`,
            implementation: 'Encourage deeper conversations, regular in-person time, shared activities',
            timeframe: 'Ongoing',
            successMetric: 'Teen has at least one close friend they see regularly'
          }
        ]
      }
    };

    this.weeklyPlaybook = [
      {
        week: 1,
        title: 'Awareness Week',
        parentAction: 'Do the experiments yourself. Track your own phone use. Notice how you feel.',
        teenAction: 'Do one challenge from the Teen Challenges tab. Journal what you discover.',
        together: 'Family meeting: Share what you discovered. No judgment. Just learning.'
      },
      {
        week: 2,
        title: 'Algorithm Week',
        parentAction: 'Have the "your feed isn\'t reality" conversation. Share the science.',
        teenAction: 'Do the Spot the Algorithm challenge. Try unfollowing 5 accounts that trigger comparison.',
        together: 'Audit feeds together. Find accounts to follow that inspire instead of comparing.'
      },
      {
        week: 3,
        title: 'Sleep Week',
        parentAction: 'Establish phone-free bedroom. Model it yourself.',
        teenAction: 'Do the sleep experiment. Track sleep quality for 3 nights with phone in bedroom, 3 nights without.',
        together: 'Review sleep data. Discuss connection between sleep and mood.'
      },
      {
        week: 4,
        title: 'Connection Week',
        parentAction: 'Plan device-free family time. Cook together, game, talk.',
        teenAction: 'Schedule one real hangout with a friend. Phone-free if possible.',
        together: 'Family meeting: Discuss the difference between scrolling and real connection.'
      },
      {
        week: 5,
        title: 'Activity Week',
        parentAction: 'Help teen reactivate one offline hobby. Commit to attending/supporting.',
        teenAction: 'Do the Activity Inventory challenge. Commit to 30 minutes of a flow activity daily.',
        together: 'Do an activity together. Notice how you feel after.'
      },
      {
        week: 6,
        title: 'Integration Week',
        parentAction: 'Review progress. Celebrate wins. Adjust what isn\'t working.',
        teenAction: 'Journal: How has your mood, sleep, focus changed? What challenges remain?',
        together: 'Honest conversation about what\'s working. Set sustainable habits going forward.'
      }
    ];
  }

  getImplementationGuide(rootCause) {
    const key = rootCause
      .toLowerCase()
      .replace(/\s+/g, '')
      .replace(/-/g, '');
    return this.implementations[key];
  }

  getWeeklyPlaybook() {
    return this.weeklyPlaybook;
  }

  showImplementationUI(rootCauseKey) {
    const impl = this.implementations[rootCauseKey];
    if (!impl) return;

    let html = `
      <div class="card border-0 shadow-sm mb-4">
        <div class="card-header bg-info text-white">
          <h4 class="mb-0">${impl.rootCause}</h4>
          <p class="mb-0 text-white-50">${impl.summary}</p>
        </div>

        <div class="card-body">
          <h5 class="mb-3">⚠️ Warning Signs to Watch For:</h5>
          <ul class="mb-4">
            ${impl.warningSignsParent.map(sign => `<li class="mb-2">${sign}</li>`).join('')}
          </ul>

          <hr>

          <h5 class="mb-3">🎯 Specific Interventions:</h5>
    `;

    impl.interventions.forEach((intervention, idx) => {
      html += `
        <div class="card border-0 bg-light mb-3">
          <div class="card-body">
            <h6 class="card-title mb-2">${idx + 1}. ${intervention.action}</h6>

            <div class="mb-3 p-3 bg-white rounded" style="border-left: 4px solid #3498db;">
              <small class="text-muted"><strong>What to Say:</strong></small>
              <p class="small mb-0 mt-1 font-italic">"${intervention.script}"</p>
            </div>

            <p class="small mb-2"><strong>Implementation:</strong> ${intervention.implementation}</p>
            <p class="small mb-2"><strong>Timeframe:</strong> ${intervention.timeframe}</p>
            <p class="small"><strong>Success Metric:</strong> ${intervention.successMetric}</p>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </div>
    `;

    return html;
  }

  init() {
    window.parentImplementationHandler = this;
  }
}

const parentImplementationHandler = new ParentImplementationHandler();
parentImplementationHandler.init();
