// Teen Reality Tab - What's Actually Happening (Teen Voices)
// Purpose: Establish common ground before moving to challenges
// Note: All data is US-based research and statistics

class TeenRealityHandler {
  constructor() {
    this.sections = {
      whatTeensSay: {
        title: "What Teens Actually Say",
        intro: "These aren't therapist opinions. These are real teens talking about what they're experiencing.",
        quotes: [
          {
            stat: "47% of teens spend most free time alone in their room",
            context: "And they feel trapped, not relaxed"
          },
          {
            stat: "60% of teens say social media makes them feel worse about themselves",
            context: "Even though they keep checking it"
          },
          {
            stat: "71% of teens use 2+ social media platforms daily",
            context: "But feel MORE lonely, not less connected"
          },
          {
            stat: "73% of high school students don't get enough sleep",
            context: "Because their phone keeps them up"
          },
          {
            stat: "88% of teens bring their phone to bed",
            context: "Even though it ruins their sleep"
          },
          {
            stat: "36% of teens report feeling lonely at school",
            context: "Despite being \"connected\" online"
          }
        ]
      },

      thePattern: {
        title: "The Pattern Nobody Talks About",
        sections: [
          {
            heading: "Algorithm vs Reality",
            real: "Your feed shows edited highlight reels, not real life",
            you: "You compare your behind-the-scenes to everyone else's front stage",
            result: "Feel worse about yourself"
          },
          {
            heading: "Phone vs Sleep vs Mood",
            real: "Your phone's blue light keeps you awake 30-90 minutes longer",
            you: "You're tired the next day, irritable, can't focus",
            result: "Everything feels harder"
          },
          {
            heading: "Scrolling vs Real Connection",
            real: "Scrolling gives quick dopamine hits with anxiety attached",
            you: "Real friendship requires leaving your room and being vulnerable",
            result: "Easier to stay in, harder to feel actually connected"
          },
          {
            heading: "Room vs Energy",
            real: "Staying in feels safe but depletes you",
            you: "Being outside and with people feels scary but restores you",
            result: "You stay in, feel worse, stay in more (spiral)"
          }
        ]
      },

      youreNotAlone: {
        title: "You're Not Alone In This",
        statements: [
          "You're not lazy for staying in your room—you're overwhelmed",
          "You're not broken for feeling lonely despite being online—the system is broken",
          "You're not weak for struggling—41% of teens are struggling too",
          "You're not the problem—the problem is designed to break you",
          "Your phone isn't just a phone—it's engineered to keep you hooked",
          "Social media isn't just social—it's algorithmically designed for comparison anxiety"
        ]
      },

      theWorldRightNow: {
        title: "The World Right Now",
        intro: "Your stress isn't just about your phone.",
        stressors: [
          {
            issue: "War and Conflict",
            reality: "You grew up watching wars on repeat in your feed. That's trauma, not weakness."
          },
          {
            issue: "Political Division",
            reality: "Politicians and online fights turned disagreement into personal attack. Your nervous system learned early: people you disagree with are threats."
          },
          {
            issue: "Immigration, Identity, National Division",
            reality: "Constant messaging about who belongs and who doesn't. If you're an immigrant or minority, that's directed at you. That's stress."
          },
          {
            issue: "Climate Anxiety",
            reality: "You were told the world is on fire, literally and figuratively. Adults told you to fix it while doing nothing. That's cognitive dissonance and rage."
          },
          {
            issue: "Economic Uncertainty",
            reality: "You watch adults panic about economy. Student debt. Housing costs. Your future feels like a threat, not an opportunity."
          },
          {
            issue: "Institutional Breakdown",
            reality: "Schools that feel unsafe. Police you don't trust. Politicians who don't listen. Adults who say 'your generation will fix this.' You're 15."
          }
        ],
        validation: "Your stress isn't weakness. It's a rational nervous system responding to a genuinely stressful world. The anxiety you feel is real because the world IS anxiety-inducing."
      },

      whyItMatters: {
        title: "Why You Should Care About This",
        points: [
          {
            point: "Understanding = Power",
            explanation: "Once you see how it works, you can't unsee it. And once you can't unsee it, you can actually do something about it."
          },
          {
            point: "Small Changes Work",
            explanation: "You don't have to quit your phone. You just have to be intentional. Phone-free hour. One real hangout. One flow activity. That's it."
          },
          {
            point: "You Actually Feel Better",
            explanation: "The challenges ahead aren't punishment. They're tools. Try them and you'll notice: better sleep, better mood, better focus, better connection."
          }
        ]
      }
    };
  }

  getSection(sectionKey) {
    return this.sections[sectionKey];
  }

  getAllSections() {
    return this.sections;
  }

  init() {
    window.teenRealityHandler = this;
  }
}

const teenRealityHandler = new TeenRealityHandler();
teenRealityHandler.init();
