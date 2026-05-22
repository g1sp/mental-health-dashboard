// Teen Sources - Comprehensive data sources for all statistics and research

class TeenSourcesHandler {
  constructor() {
    this.sources = {
      title: "Where This Information Comes From",
      intro: "All the statistics, research, and tools in this app come from peer-reviewed studies, government surveys, and mental health organizations. This isn't opinion—it's data. All information is for educational purposes.",
      categories: [
        {
          category: "Youth Mental Health Trends",
          sources: [
            {
              name: "CDC Youth Risk Behavior Survey (YRBS)",
              description: "Biennial national survey of high school students' behaviors and health conditions",
              stats: "41% persistent sadness/hopelessness, 73% inadequate sleep, suicide rates",
              year: "2021, 2023",
              url: "https://www.cdc.gov/healthyyouth/yrbs/"
            },
            {
              name: "National Institute of Mental Health (NIMH)",
              description: "U.S. government research on mental health conditions and treatment",
              stats: "37% increase in major depressive episodes among adolescents",
              url: "https://www.nimh.nih.gov/"
            },
            {
              name: "American Psychological Association (APA)",
              description: "Professional organization publishing mental health research and guidelines",
              stats: "Teen stress and anxiety trends, psychological research",
              url: "https://www.apa.org/"
            }
          ]
        },
        {
          category: "Social Media & Phone Use Impact",
          sources: [
            {
              name: "JAMA Pediatrics",
              description: "Peer-reviewed medical journal publishing pediatric research",
              stats: "0.41 unit increase in depression per hour of daily social media use",
              year: "2023 study",
              url: "https://jamanetwork.com/journals/jamapediatrics"
            },
            {
              name: "American Academy of Pediatrics (AAP)",
              description: "Professional organization with guidelines on screen time and mental health",
              stats: "Recommendations on healthy media consumption for youth",
              url: "https://www.healthychildren.org/"
            },
            {
              name: "San Diego State University: iGen Study",
              description: "Longitudinal research on social media use and teen mental health",
              stats: "Screen time and depression/anxiety correlations",
              url: "https://www.sdsu.edu/"
            }
          ]
        },
        {
          category: "Sleep & Mental Health",
          sources: [
            {
              name: "Sleep Research Society",
              description: "Professional organization dedicated to sleep science",
              stats: "Impact of blue light on sleep, sleep deprivation effects on mood",
              url: "https://www.sleepresearchsociety.org/"
            },
            {
              name: "National Sleep Foundation",
              description: "Non-profit organization providing sleep health information",
              stats: "Recommended sleep for teens: 8-10 hours, phone impact on sleep",
              url: "https://www.thensf.org/"
            }
          ]
        },
        {
          category: "Connection & Protective Factors",
          sources: [
            {
              name: "Trevor Project",
              description: "Research on mental health and resilience in LGBTQ+ youth",
              stats: "Family connection reduces suicidal ideation by 62%",
              url: "https://www.thetrevorproject.org/"
            },
            {
              name: "American Adolescent Health Institute",
              description: "Research on protective factors in adolescent mental health",
              stats: "Real relationships and physical activity as depression fighters",
              url: "https://www.adolescenthealth.org/"
            },
            {
              name: "Harvard Study of Adult Development",
              description: "70+ year longitudinal study on what makes people happy and healthy",
              stats: "Quality of relationships is primary predictor of life satisfaction and mental health",
              url: "https://www.adultdevelopmentstudy.org/"
            }
          ]
        },
        {
          category: "Coping & Mental Health Interventions",
          sources: [
            {
              name: "Cognitive Behavioral Therapy (CBT) Research",
              description: "Evidence-based psychotherapy widely studied and recommended for youth",
              stats: "Effectiveness rates for anxiety and depression",
              url: "https://www.apa.org/ptsd-guideline/treatments/cognitive-behavioral"
            },
            {
              name: "Dialectical Behavior Therapy (DBT) Studies",
              description: "Evidence-based therapy for emotion regulation",
              stats: "Effectiveness for anxiety, emotional dysregulation, self-harm",
              url: "https://www.apa.org/"
            },
            {
              name: "Acceptance and Commitment Therapy (ACT) Research",
              description: "Therapeutic approach for anxiety and depression",
              stats: "Mindfulness and acceptance-based interventions",
              url: "https://www.contextualscience.org/"
            }
          ]
        },
        {
          category: "Crisis & Prevention Resources",
          sources: [
            {
              name: "National Suicide Prevention Lifeline (988)",
              description: "U.S. federally funded crisis service",
              stats: "Available 24/7, serves millions annually",
              url: "https://988lifeline.org/"
            },
            {
              name: "Crisis Text Line",
              description: "Text-based mental health crisis support",
              stats: "Reaches crisis situations when phone calls aren't possible",
              url: "https://www.crisistextline.org/"
            },
            {
              name: "SAMHSA National Helpline",
              description: "Substance Abuse and Mental Health Services Administration support",
              stats: "Free, confidential, 24/7 treatment referral",
              url: "https://www.samhsa.gov/find-help/national-helpline"
            }
          ]
        }
      ]
    };
  }

  getAll() {
    return this.sources;
  }

  getCategories() {
    return this.sources.categories;
  }

  getCategory(categoryName) {
    return this.sources.categories.find(c => c.category === categoryName);
  }

  init() {
    window.teenSourcesHandler = this;
  }
}

const teenSourcesHandler = new TeenSourcesHandler();
teenSourcesHandler.init();
