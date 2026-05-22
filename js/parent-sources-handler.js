// Parent Sources - Comprehensive data sources for research, statistics, and interventions

class ParentSourcesHandler {
  constructor() {
    this.sources = {
      title: "Where This Information Comes From",
      intro: "Every statistic, research finding, and recommendation in this app comes from peer-reviewed studies, government surveys, and established mental health organizations. This is evidence-based guidance for parents. All information is for educational purposes.",
      categories: [
        {
          category: "Youth Mental Health Epidemiology",
          sources: [
            {
              name: "CDC Youth Risk Behavior Survey (YRBS)",
              description: "Biennial national survey of high school students' health behaviors and conditions",
              stats: "41% persistent sadness/hopelessness, 37% increase in major depressive episodes, 73% inadequate sleep, suicide ideation rates",
              year: "2021, 2023",
              url: "https://www.cdc.gov/healthyyouth/yrbs/"
            },
            {
              name: "National Institute of Mental Health (NIMH)",
              description: "U.S. government agency conducting and supporting mental health research",
              stats: "Prevalence of depression, anxiety, and other conditions in youth",
              url: "https://www.nimh.nih.gov/health/statistics"
            },
            {
              name: "Substance Abuse and Mental Health Services Administration (SAMHSA)",
              description: "Federal agency tracking mental health and substance use trends",
              stats: "National mental health estimates, treatment utilization data",
              url: "https://www.samhsa.gov/data"
            },
            {
              name: "American Psychiatric Association (APA)",
              description: "Professional organization publishing DSM-5 diagnostic criteria and research",
              stats: "Clinical definitions and prevalence of mental health conditions",
              url: "https://www.psychiatry.org/"
            }
          ]
        },
        {
          category: "Screen Time & Technology Impact",
          sources: [
            {
              name: "JAMA Pediatrics",
              description: "Peer-reviewed medical journal publishing pediatric research",
              stats: "Each hour of daily social media increases depression severity by 0.41 units",
              year: "2023 study",
              url: "https://jamanetwork.com/journals/jamapediatrics"
            },
            {
              name: "American Academy of Pediatrics (AAP)",
              description: "Professional organization with evidence-based media use guidelines",
              stats: "Screen time recommendations, digital wellness guidelines",
              url: "https://www.healthychildren.org/English/media/Pages/default.aspx"
            },
            {
              name: "San Diego State University: iGen Study",
              description: "Longitudinal research tracking social media use and mental health outcomes",
              stats: "Correlations between screen time and depression/anxiety in teens",
              url: "https://www.sdsu.edu/"
            },
            {
              name: "University of Pennsylvania: Social Media Impact Research",
              description: "Studies on Instagram, TikTok, and comparison anxiety",
              stats: "Algorithm effects on teen self-esteem and mental health",
              url: "https://www.upenn.edu/"
            }
          ]
        },
        {
          category: "Sleep & Adolescent Development",
          sources: [
            {
              name: "American Academy of Sleep Medicine",
              description: "Professional organization providing sleep health guidelines",
              stats: "Recommended teen sleep: 8-10 hours, adolescent circadian rhythm research",
              url: "https://aasm.org/"
            },
            {
              name: "National Sleep Foundation",
              description: "Non-profit organization dedicated to sleep health",
              stats: "Blue light exposure delays sleep 30-90 minutes, sleep deprivation effects",
              url: "https://www.thensf.org/"
            },
            {
              name: "Journal of Adolescent Health",
              description: "Peer-reviewed journal publishing sleep and adolescent research",
              stats: "Sleep quality correlation with mood regulation and stress resilience",
              url: "https://www.jahonline.org/"
            }
          ]
        },
        {
          category: "Family Connection & Protective Factors",
          sources: [
            {
              name: "Trevor Project",
              description: "Research on mental health, resilience, and suicide prevention in LGBTQ+ youth",
              stats: "Family support reduces suicidal ideation by 62%, strong family connection as primary protective factor",
              url: "https://www.thetrevorproject.org/research/"
            },
            {
              name: "Centers for Disease Control: Positive Youth Development",
              description: "CDC research on factors that promote teen mental health",
              stats: "Family connection, peer relationships, and resilience",
              url: "https://www.cdc.gov/violenceprevention/youthviolence/socialecologicalmodel.html"
            },
            {
              name: "Harvard Study of Adult Development",
              description: "70+ year longitudinal study on happiness, health, and relationships",
              stats: "Quality of relationships is strongest predictor of life satisfaction and mental health",
              url: "https://www.adultdevelopmentstudy.org/"
            },
            {
              name: "American Psychological Association (APA)",
              description: "Research on parenting, family systems, and teen mental health",
              stats: "Parent modeling, secure attachment, and protective factors",
              url: "https://www.apa.org/"
            }
          ]
        },
        {
          category: "Therapy & Evidence-Based Treatments",
          sources: [
            {
              name: "Cognitive Behavioral Therapy (CBT) Meta-Analyses",
              description: "Extensive research on effectiveness for youth anxiety and depression",
              stats: "60-80% effectiveness rate for depression and anxiety in adolescents",
              url: "https://www.apa.org/ptsd-guideline/treatments/cognitive-behavioral"
            },
            {
              name: "Dialectical Behavior Therapy (DBT) Research",
              description: "Evidence-based therapy for emotion regulation and self-harm",
              stats: "Effectiveness for anxiety, emotional dysregulation, suicide prevention",
              url: "https://www.apa.org/"
            },
            {
              name: "Acceptance and Commitment Therapy (ACT)",
              description: "Mindfulness-based therapeutic approach",
              stats: "Effectiveness for anxiety, depression, and life satisfaction",
              url: "https://www.contextualscience.org/"
            },
            {
              name: "SAMHSA: Evidence-Based Practices",
              description: "Comprehensive database of federally reviewed evidence-based treatments",
              stats: "Treatment effectiveness ratings, implementation guides",
              url: "https://www.samhsa.gov/ebp/web-guide"
            }
          ]
        },
        {
          category: "Mental Health Access & Barriers",
          sources: [
            {
              name: "American Psychological Association: Mental Health Parity",
              description: "Research on therapy access, cost, and insurance coverage",
              stats: "Average therapy cost $100-250/session, therapist shortage, waiting lists",
              url: "https://www.apa.org/"
            },
            {
              name: "Milliman Research Institute",
              description: "Health care research including mental health access",
              stats: "Utilization of mental health services, access barriers",
              url: "https://www.milliman.com/"
            },
            {
              name: "RAND Corporation: Mental Health Care",
              description: "Research on mental health system capacity and access",
              stats: "Estimated shortage of mental health providers, wait times",
              url: "https://www.rand.org/"
            }
          ]
        },
        {
          category: "Crisis Prevention & Resources",
          sources: [
            {
              name: "National Suicide Prevention Lifeline (988)",
              description: "Federally funded 24/7 crisis service for suicide prevention",
              stats: "Reaches over 3 million people annually, suicide prevention research",
              url: "https://988lifeline.org/"
            },
            {
              name: "Crisis Text Line",
              description: "Text-based mental health crisis support",
              stats: "Reaches youth in crisis when other methods aren't available",
              url: "https://www.crisistextline.org/"
            },
            {
              name: "SAMHSA National Helpline",
              description: "Free, confidential treatment referral and information service",
              stats: "24/7 availability, bilingual support, evidence-based referrals",
              url: "https://www.samhsa.gov/find-help/national-helpline"
            },
            {
              name: "American Foundation for Suicide Prevention",
              description: "Research and advocacy on suicide prevention",
              stats: "Risk factors, warning signs, and prevention strategies",
              url: "https://afsp.org/"
            }
          ]
        },
        {
          category: "Parent Support & Implementation Science",
          sources: [
            {
              name: "Parenting Research Center",
              description: "Research on evidence-based parenting strategies",
              stats: "Effectiveness of collaborative parenting approaches",
              url: "https://www.parentingrc.org/"
            },
            {
              name: "Implementation Science Literature",
              description: "Research on how evidence-based practices are adopted",
              stats: "Why interventions work, how to support behavior change",
              url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5448062/"
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
    window.parentSourcesHandler = this;
  }
}

const parentSourcesHandler = new ParentSourcesHandler();
parentSourcesHandler.init();
