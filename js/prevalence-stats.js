// Prevalence Statistics - Show teens they're not alone
// Data from CDC YRBS, research studies, and clinical sources

const prevalenceStats = {
  distorted: {
    teenage_depression: '41% of high school students reported persistent feelings of sadness or hopelessness',
    social_comparison: '60% of teens say comparing themselves to others on social media makes them feel worse about themselves',
    two_hour_threshold: 'Each additional hour of social media use per day correlates with 0.41 unit increase in depression severity',
    frequency: '71% of teens use 2 or more social media platforms'
  },

  attention: {
    sleep_deprivation: '73% of high school students don\'t get enough sleep',
    phone_before_bed: '88% of teens bring their phone to bed',
    attention_impact: '72% of teens report difficulty focusing on schoolwork due to phone notifications',
    anxiety_from_notifications: 'Teens check phones 96 times per day on average (every 10 minutes)'
  },

  protection: {
    missing_activities: '51% of teens say they don\'t have a hobby or activity they\'re passionate about',
    screen_vs_activity: 'Average teen spends 8+ hours on screens daily vs. 2-3 hours on physical activity',
    loneliness_paradox: 'Heavy social media users report MORE loneliness, not less',
    real_friends: '36% of high school students report feeling lonely at school'
  },

  avoidance: {
    room_isolation: '47% of teens report spending most free time alone in their room',
    social_anxiety_increase: 'Social anxiety among teens increased 48% in past 5 years',
    avoidance_cycle: '62% of teens with social anxiety avoid social situations, which increases anxiety',
    suicidal_ideation: '16% of high school students seriously considered suicide (including avoidance as risk factor)'
  }
};

function getPrevalenceStat(category) {
  const stats = prevalenceStats[category] || {};
  const statKeys = Object.keys(stats);
  return stats[statKeys[Math.floor(Math.random() * statKeys.length)]];
}
