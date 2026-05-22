// Teen Reality Tab - What's Actually Happening (Synthesized Gen Z Voice)
// Purpose: Establish common ground before moving to challenges
// Note: All data is US-based research and statistics

class TeenRealityHandler {
  constructor() {
    this.sections = {
      whatGenZSays: {
        title: "What Gen Z Actually Says",
        intro: "These aren't therapist opinions. These are real teens talking about what they're experiencing.",
        quotes: [
          {
            stat: "47% of Gen Z spend most free time alone in their room",
            context: "And they feel trapped, not relaxed"
          },
          {
            stat: "60% say social media makes them feel worse about themselves",
            context: "Even though they keep checking it"
          },
          {
            stat: "71% use 2+ social media platforms daily",
            context: "But feel MORE lonely, not less connected"
          },
          {
            stat: "73% of high school students don't get enough sleep",
            context: "Because their phone keeps them up"
          },
          {
            stat: "88% bring their phone to bed",
            context: "Even though it ruins their sleep"
          },
          {
            stat: "36% report feeling lonely at school",
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
