// Parent Reality Tab - What Parents Need to Know (Evidence-Based)
// Purpose: Validate parent concerns and show why this matters
// Note: All data is US-based research and statistics

class ParentRealityHandler {
  constructor() {
    this.sections = {
      theNumbers: {
        title: "The Numbers Are Real",
        intro: "This isn't fear-mongering. This is US research data.",
        critical: [
          {
            stat: "41% of high school students report persistent sadness or hopelessness",
            source: "CDC Youth Risk Behavior Survey",
            implication: "This isn't normal teenage moodiness. This is clinical depression rates."
          },
          {
            stat: "37% increase in major depressive episodes among adolescents in past decade",
            source: "Clinical research",
            implication: "The trend is accelerating, not stabilizing."
          },
          {
            stat: "Each additional hour of social media per day = 0.41 unit increase in depression severity",
            source: "JAMA Pediatrics",
            implication: "The relationship between screen time and mental health is quantifiable."
          },
          {
            stat: "73% of high school students don't get enough sleep",
            source: "Sleep research",
            implication: "Sleep deprivation directly impairs mood regulation and stress resilience."
          }
        ]
      },

      theProtectiveFactors: {
        title: "What Actually Prevents Depression",
        intro: "The good news: Science knows what works.",
        factors: [
          {
            factor: "Family Connection",
            evidence: "62% reduction in suicidal ideation when family support is strong",
            what_parents_can_do: "Real time together. Dinners without phones. Actual conversation."
          },
          {
            factor: "Physical Activity",
            evidence: "Exercise is as effective as medication for mild-to-moderate depression",
            what_parents_can_do: "Support one hobby or sport. Model activity yourself."
          },
          {
            factor: "Real Relationships",
            evidence: "Deep friendships are the strongest buffer against depression",
            what_parents_can_do: "Encourage in-person hangouts. Create space for friendships."
          },
          {
            factor: "Sleep Quality",
            evidence: "8-10 hours of uninterrupted sleep is foundational for mental health",
            what_parents_can_do: "Device-free bedroom. No screens 30 min before bed."
          }
        ]
      },

      theAccessGap: {
        title: "The Therapy Access Crisis",
        intro: "Half of teens who want mental health care can't get it.",
        gaps: [
          {
            problem: "Cost",
            reality: "Average therapy session costs $100-250. Most families can't afford it."
          },
          {
            problem: "Availability",
            reality: "Therapist shortage = months-long waiting lists, even in urban areas"
          },
          {
            problem: "Stigma",
            reality: "Many teens won't ask for help due to shame or fear of judgment"
          },
          {
            problem: "Crisis Bottleneck",
            reality: "Crisis lines are overwhelmed; preventive support is scarce"
          }
        ],
        implication: "This app exists to fill that gap. Not instead of therapy—alongside it."
      },

      whyThisMatters: {
        title: "Why You're Not Overreacting",
        statements: [
          {
            statement: "Your teen's mental health is declining at a measurable rate",
            why: "This isn't you being anxious. This is epidemiological data."
          },
          {
            statement: "Your teen's phone use is engineered to be addictive",
            why: "Tech companies employ neuroscientists to keep users engaged. It's not willpower—it's by design."
          },
          {
            statement: "Your modeling matters more than your lectures",
            why: "Teens do what they see, not what you tell them. If you're on your phone constantly, they will be too."
          },
          {
            statement: "You actually have leverage here",
            why: "Family connection is THE strongest protective factor. Your relationship is the intervention."
          }
        ]
      },

      whatNowWorks: {
        title: "What Does Work (And How This App Helps)",
        approaches: [
          {
            approach: "Shared accountability, not lectures",
            how: "You and your teen do the same challenges. You both track progress. Nobody's the authority."
          },
          {
            approach: "Micro-commitments, not grand resolutions",
            how: "Phone-free dinner (not phone-free life). One hangout per week (not constant socializing)."
          },
          {
            approach: "Experiential learning, not information",
            how: "Your teen discovers the problem themselves through challenges. They don't hear it from you."
          },
          {
            approach: "Real change through connection",
            how: "When you and your teen do hard things together, trust rebuilds. That's where real change happens."
          }
        ]
      },

      theWorldRightNow: {
        title: "The World Your Teen Is Growing Up In",
        intro: "Your teen's anxiety isn't just about algorithms. It's about living in genuinely intense times.",
        stressors: [
          {
            issue: "War and Conflict",
            reality: "They grew up watching wars on repeat in their feed. That's processed trauma, not weakness."
          },
          {
            issue: "Political Division Turned Personal",
            reality: "Disagreement became personal attack. Their nervous system learned early: different viewpoints = threat. That's hypervigilance."
          },
          {
            issue: "Immigration, Identity, Belonging",
            reality: "If your teen is an immigrant, a minority, or has immigrant friends, they've absorbed years of messaging about who belongs. That's chronic stress."
          },
          {
            issue: "Climate Anxiety",
            reality: "They were told the world is burning. Then told to fix it. Then watched adults do nothing. That's cognitive dissonance, rage, and learned helplessness."
          },
          {
            issue: "Economic Precarity",
            reality: "They watch you panic about economy, debt, housing. They absorb that their future is threatened, not promising. That's existential anxiety."
          },
          {
            issue: "Institutional Breakdown",
            reality: "Schools that don't feel safe. Police they don't trust. Politicians who don't listen. Adults saying 'your generation will fix this' while the teen is 15. That's abandoned responsibility."
          }
        ],
        validation: "Your teen isn't anxious for no reason. The world IS anxiety-inducing right now. Part of supporting them is acknowledging that their stress is rational, not pathological. The phone is a symptom, not the cause."
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
    window.parentRealityHandler = this;
  }
}

const parentRealityHandler = new ParentRealityHandler();
parentRealityHandler.init();
