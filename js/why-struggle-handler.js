class WhyStruggleHandler {
  constructor() {
    this.causeDetails = {
      distorted: {
        title: '🪞 Distorted Information Processing',
        summary: 'What teens see shapes how they feel',
        mainProblem: 'Algorithm-driven social media feeds amplify highlight reels and create false baselines for comparison.',
        problems: [
          {
            heading: 'Curated Content Effect',
            description: 'Social media shows edited, filtered versions of reality. Algorithms prioritize engaging (often extreme or aspirational) content.'
          },
          {
            heading: 'Upward Social Comparison',
            description: 'Teens compare their "behind-the-scenes" lives with others\' "highlight reels," creating an illusion that everyone else is happier and more successful.'
          },
          {
            heading: 'Impossible Standards',
            description: 'Exposure to heavily edited images and curated success stories sets unrealistic expectations for appearance, achievement, and social life.'
          }
        ],
        mechanism: 'Distorted Perception → Self-Esteem Erosion → Depression',
        research: [
          {
            title: 'JAMA Pediatrics Study',
            finding: 'Each additional hour of social media use per year correlates with a 0.41-unit increase in depression severity',
            detail: 'Longitudinal study of 3,826 adolescents over 4 years. Social media showed the strongest association with depression—stronger than other screen activities.'
          },
          {
            title: 'Upward Social Comparison Theory',
            finding: 'Curated content creates perception-reality gaps that drive depression',
            detail: 'Research confirms that comparing yourself to idealized others predictably reduces self-esteem and increases depressive symptoms.'
          },
          {
            title: 'Algorithmic Reinforcement Spirals',
            finding: 'Depressed users get fed mood-congruent content, creating feedback loops',
            detail: 'Algorithms learn user preferences and show more of what keeps people engaged—including negative content that reinforces depression.'
          }
        ],
        solutions: [
          'Understand that social media = highlight reel, not reality',
          'Limit social media use (studies suggest 30-60 min/day is healthier)',
          'Follow positive, diverse role models',
          'Practice media literacy: recognize filters, editing, and curated narratives',
          'Take regular breaks from comparison-heavy platforms'
        ],
        actionableSteps: [
          'Unfollow accounts that trigger comparison or negative feelings',
          'Follow accounts that inspire or educate (not just entertain)',
          'Set app time limits (most phones have built-in tools)',
          'Use "mute" features to hide certain words or topics',
          'Schedule device-free times, especially before bed'
        ]
      },
      capacity: {
        title: '⚡ Compromised Coping Capacity',
        summary: 'They can\'t recover from stress',
        mainProblem: 'Continuous phone interruptions prevent teens from maintaining sustained attention and recovery time needed to process stress.',
        problems: [
          {
            heading: 'Attention Fragmentation',
            description: 'Constant notifications and phone access break sustained focus. Even a phone\'s presence reduces cognitive capacity by ~10%.'
          },
          {
            heading: 'Sleep Disruption',
            description: 'Blue light and notifications interrupt sleep cycles, impairing emotional regulation and stress resilience.'
          },
          {
            heading: 'No Recovery Time',
            description: 'Without uninterrupted periods, the nervous system cannot return to baseline. Stress stays activated, exhausting emotional resources.'
          }
        ],
        mechanism: 'Fragmented Attention → Sleep Loss → Dysregulated Nervous System → Inability to Cope',
        research: [
          {
            title: 'Castelo et al. (2025) - PNAS Nexus',
            finding: 'Blocking mobile internet improves sustained attention, mental health, and subjective well-being',
            detail: 'Month-long randomized controlled trial found that removing constant internet access produced measurable improvements in cognitive performance and psychological well-being. This is the primary study supporting this cause.'
          },
          {
            title: 'Attention & The Mere Presence Effect',
            finding: 'Just having a phone visible reduces cognitive capacity by ~10%',
            detail: 'Even a phone that\'s off reduces working memory and attention span. The brain is subconsciously distracted by its availability.'
          },
          {
            title: 'Sleep & Mental Health',
            finding: 'Poor sleep is a key predictor of depression and anxiety in teens',
            detail: 'Sleep deprivation directly impairs emotional regulation and increases vulnerability to stress.'
          }
        ],
        solutions: [
          'Device-free zones (bedroom, dining table)',
          'No phones 30-60 minutes before sleep',
          'Single-tasking instead of multitasking',
          'Guided coping exercises (breathing, grounding)',
          'Offline recovery activities (reading, nature, hobbies)'
        ],
        actionableSteps: [
          'Create a "phone-free" bedroom policy',
          'Use app blockers during focus time',
          'Take 10-minute phone breaks every hour',
          'Practice offline coping skills from this app\'s Coping tab',
          'Establish a pre-sleep wind-down routine (no screens 30 min before bed)'
        ]
      },
      protection: {
        title: '🛡️ Reduced Protective Buffers',
        summary: 'They\'re missing stress defenses',
        mainProblem: 'Social media replaces face-to-face connection and hobbies, removing the strongest buffers against depression: real relationships, physical activity, and flow-state activities.',
        problems: [
          {
            heading: 'Social Media Replaces Real Connection',
            description: 'Likes and comments are not equivalent to real relationships. Teens miss deep, supportive friendships and community involvement.'
          },
          {
            heading: 'Physical Activity Decline',
            description: 'More screen time means less exercise. Physical activity is a proven stress buffer, releasing endorphins and improving mood.'
          },
          {
            heading: 'Loss of Hobbies & Flow',
            description: 'Sports, music, art, and hobbies that create "flow" states are displaced by passive social media. Flow states build resilience and competence.'
          }
        ],
        mechanism: 'Social Isolation → Physical Inactivity → Loss of Accomplishment → Increased Vulnerability to Stress',
        research: [
          {
            title: 'Social Connection as Protective Factor',
            finding: 'Real relationships are the strongest buffer against depression',
            detail: 'Decades of neuroscience research confirm that social support, deep friendships, and community involvement are protective factors that outweigh many risk factors.'
          },
          {
            title: 'Physical Activity & Mental Health',
            finding: 'Exercise is as effective as medication for mild-to-moderate depression',
            detail: 'Physical activity increases endorphins, improves sleep, and builds self-efficacy. Teens who are inactive have significantly higher depression rates.'
          },
          {
            title: 'Flow State & Resilience',
            finding: 'Hobbies that create "flow" (complete engagement) build competence and reduce anxiety',
            detail: 'Activities like music, sports, art, coding, and writing create a sense of accomplishment and control that protects against depression.'
          }
        ],
        solutions: [
          'Prioritize real-world friendships and face-to-face time',
          'Regular physical activity (sports, exercise, outdoor time)',
          'Develop offline hobbies and interests',
          'Join clubs, teams, or communities',
          'Spend time in nature regularly'
        ],
        actionableSteps: [
          'Schedule at least 30 minutes of physical activity most days',
          'Join one school club or community group this term',
          'Dedicate time to a hobby (music, art, writing, sports, etc.)',
          'Plan one friend hangout per week (in-person, not just texting)',
          'Spend at least 30 minutes outside daily (even a walk counts)'
        ]
      }
    };
  }

  showCauseDetail(cause) {
    const details = this.causeDetails[cause];
    if (!details) return;

    const modal = new bootstrap.Modal(document.getElementById('causeDetailModal'));
    document.getElementById('causeDetailTitle').textContent = details.title;

    let body = `
      <div class="mb-4">
        <h6 class="text-muted">${details.summary}</h6>
        <p><strong>${details.mainProblem}</strong></p>
      </div>

      <div class="mb-4">
        <h5 class="mb-3">The Problems:</h5>
        ${details.problems.map(p => `
          <div class="mb-3 pb-3 border-bottom">
            <h6 class="text-secondary">${p.heading}</h6>
            <p class="small mb-0">${p.description}</p>
          </div>
        `).join('')}
      </div>

      <div class="alert alert-light border-start border-secondary ps-3 mb-4">
        <h6 class="mb-2">How It Compounds:</h6>
        <p class="small mb-0">${details.mechanism}</p>
      </div>

      <div class="mb-4">
        <h5 class="mb-3">📊 Research Findings:</h5>
        ${details.research.map(r => `
          <div class="mb-3 p-3 bg-light rounded">
            <h6 class="mb-1">${r.title}</h6>
            <p class="small mb-2"><strong>Finding:</strong> ${r.finding}</p>
            <p class="small text-muted mb-0">📌 ${r.detail}</p>
          </div>
        `).join('')}
      </div>

      <div class="mb-4">
        <h5 class="mb-3">✅ What Helps:</h5>
        <div class="mb-3">
          <h6 class="text-secondary mb-2">General Solutions:</h6>
          <ul class="small">
            ${details.solutions.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h6 class="text-secondary mb-2">This Week's Action Steps:</h6>
          <ul class="small">
            ${details.actionableSteps.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    document.getElementById('causeDetailBody').innerHTML = body;
    modal.show();
  }

  init() {
    document.querySelectorAll('.cause-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const cause = e.target.dataset.cause;
        this.showCauseDetail(cause);
      });
    });
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  const whyStruggleHandler = new WhyStruggleHandler();
  whyStruggleHandler.init();
  window.whyStruggleHandler = whyStruggleHandler;
});
