// Parent & Teen Together Handler - Shared parent-teen accountability system
// Core logic for pairing families, tracking shared challenges, and celebrating progress together

class ParentTeenTogetherHandler {
  constructor() {
    this.storageKey = 'parentTeenTogether';
    this.affirmationKey = 'parentTeenTogetherAffirmations';
    this.familyData = this.loadFamilyData();
    this.affirmations = this.loadAffirmations();
    this.currentPersona = 'teen'; // Will be set by app

    this.weeklySharedChallenges = [
      {
        week: 1,
        title: 'Phone-Free Dinners',
        description: 'Phones in the kitchen during dinner',
        duration: '3 dinners this week',
        parentChallenge: 'Put your phone in the kitchen. Notice the difference in conversation quality.',
        teenChallenge: 'Put your phone away. See what you actually talk about.',
        successMetric: 'Both completed 3 phone-free dinners',
        whyItMatters: 'Real conversation rebuilds connection. You\'ll be surprised what you learn about each other.',
        trackingUnit: 'dinners completed'
      },
      {
        week: 2,
        title: 'Sleep Protection',
        description: 'Both phones out of bedroom by 9pm',
        duration: 'Every night this week',
        parentChallenge: 'No phone in bedroom. Model good sleep hygiene.',
        teenChallenge: 'No phone in bedroom. Track how you sleep.',
        successMetric: 'Both protected sleep 5+ nights',
        whyItMatters: 'Better sleep = better mood, better focus, better connection. Science is clear.',
        trackingUnit: 'nights completed'
      },
      {
        week: 3,
        title: 'Flow Time',
        description: 'Both spend 30 min on something you love (not screens)',
        duration: '3 times this week',
        parentChallenge: 'Do that hobby you\'ve been neglecting. Remember why you loved it.',
        teenChallenge: 'Do something you used to love. Let yourself get absorbed.',
        successMetric: 'Both completed 3 flow sessions',
        whyItMatters: 'Flow activities build resilience, confidence, and real joy. Share what you did.',
        trackingUnit: 'sessions completed'
      },
      {
        week: 4,
        title: 'Device-Free Activity',
        description: 'One activity together with no devices',
        duration: '1 time this week',
        parentChallenge: 'Plan an activity with your teen. Leave phones upstairs.',
        teenChallenge: 'Do something with your parent. No phones, no rush.',
        successMetric: 'Completed 1 device-free activity',
        whyItMatters: 'Real time together is where trust rebuilds. One hour changes everything.',
        trackingUnit: 'activities completed'
      },
      {
        week: 5,
        title: 'Check-In & Honest Conversation',
        description: 'Both share what\'s been hardest and what\'s helped',
        duration: '1 conversation this week',
        parentChallenge: 'Share your struggles openly. Let your teen see you\'re not perfect.',
        teenChallenge: 'Be honest about what\'s hard. Ask your parent for ideas.',
        successMetric: 'Had real conversation about the challenges',
        whyItMatters: 'Honesty builds trust. When you admit struggle together, everything changes.',
        trackingUnit: 'conversation completed'
      },
      {
        week: 6,
        title: 'Celebrate & Commit',
        description: 'Review progress. Decide what to keep going.',
        duration: '1 family meeting',
        parentChallenge: 'Celebrate what worked. Plan to sustain the wins.',
        teenChallenge: 'Celebrate what you\'ve noticed. Suggest what you want to keep.',
        successMetric: 'Completed reflection together',
        whyItMatters: 'Progress is only real if you notice it and decide to keep it.',
        trackingUnit: 'reflection completed'
      },
      {
        week: 7,
        title: 'Loneliness & Real Connection',
        description: 'Combat epidemic-scale loneliness with quality one-on-one time',
        duration: '2 meaningful conversations this week',
        parentChallenge: 'Ask your teen about a real struggle and actually listen. Don\'t fix it—just understand.',
        teenChallenge: 'Share something real. It doesn\'t need to be solved. Being heard matters most.',
        successMetric: 'Both completed 2 deep conversations',
        whyItMatters: 'Lacking connection doubles depression risk. Quality beats quantity. Real understanding heals.',
        trackingUnit: 'conversations completed'
      },
      {
        week: 8,
        title: 'Social Connection Challenge',
        description: 'Build peer relationships beyond family',
        duration: 'Teen: 1 offline hangout with friend; Parent: 1 with friend/family',
        parentChallenge: 'Model connection by spending quality time with your friend or family member.',
        teenChallenge: 'Do something offline with a friend. No phones. If lonely, reach out to 1 person.',
        successMetric: 'Both completed 1 offline connection activity',
        whyItMatters: 'Peer friendships are foundational for teen mental health. Parents modeling connection matters.',
        trackingUnit: 'connection activities'
      },
      {
        week: 9,
        title: 'Social Media Reality Check',
        description: 'Curate feeds intentionally; reduce comparison triggers',
        duration: '2 feed audits this week',
        parentChallenge: 'Unfollow 5 accounts that trigger you. Follow 3 that educate or inspire.',
        teenChallenge: 'Audit your feeds. Unfollow comparison triggers. Follow creators you actually learn from.',
        successMetric: 'Both completed feed audit',
        whyItMatters: '60% of teens say social media makes them feel worse about themselves. Your feed is your choice.',
        trackingUnit: 'audits completed'
      },
      {
        week: 10,
        title: 'Perfectionism Release',
        description: 'Let go of \"perfect\" for a week. Focus on progress.',
        duration: 'All week practice',
        parentChallenge: 'Do something imperfectly and let it go. Show your teen that good enough is good enough.',
        teenChallenge: 'Turn in work that\'s good, not perfect. Fail at something small. Notice you survive.',
        successMetric: 'Both completed imperfection practice',
        whyItMatters: 'Perfectionism drives anxiety & depression. Done is better than perfect. Failure teaches resilience.',
        trackingUnit: 'imperfect acts completed'
      },
      {
        week: 11,
        title: 'Tech Boundaries & Digital Wellness',
        description: 'Create healthy digital boundaries for whole family',
        duration: 'Commit to 1 boundary all week',
        parentChallenge: 'Pick 1: No screens 1 hour after dinner, OR no work email after 7pm. Just one boundary.',
        teenChallenge: 'Pick 1: No TikTok/Insta before school, OR 1 phone-free hour daily. Your choice.',
        successMetric: 'Both maintained boundary 5+ days',
        whyItMatters: 'Digital addiction disrupts sleep, hijacks dopamine, feeds anxiety. One boundary creates momentum.',
        trackingUnit: 'days boundary maintained'
      },
      {
        week: 12,
        title: 'Values & Meaning-Making',
        description: 'Identify and align with what truly matters',
        duration: '1 values conversation + 1 aligned action',
        parentChallenge: 'Share your top 3 values. Tell your teen why they matter and how you live them.',
        teenChallenge: 'Identify what matters most to you (not what you think should matter). Do 1 small aligned action.',
        successMetric: 'Completed values conversation + both took 1 action',
        whyItMatters: 'Academic & social pressure override teen values. Meaning-making prevents crisis. Connection heals.',
        trackingUnit: 'values actions completed'
      }
    ];
  }

  // Generate pairing code
  generatePairingCode() {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    this.familyData.parentCode = code;
    this.familyData.createdAt = new Date().toISOString();
    this.saveFamilyData();
    return code;
  }

  // Teen enters code to pair with parent
  pairWithParent(code) {
    if (code.toString() === this.familyData.parentCode) {
      this.familyData.isPaired = true;
      this.familyData.pairedAt = new Date().toISOString();
      this.saveFamilyData();
      return { success: true, message: 'Successfully paired with parent!' };
    }
    return { success: false, message: 'Invalid code. Ask your parent to try again.' };
  }

  // Start current week's challenge
  startWeek(weekNumber) {
    if (weekNumber < 1 || weekNumber > this.weeklySharedChallenges.length) return null;

    const challenge = this.weeklySharedChallenges[weekNumber - 1];
    this.familyData.currentWeek = weekNumber;
    this.familyData.weekStarted = new Date().toISOString();
    this.familyData.weekProgress = {
      parentCompleted: 0,
      teenCompleted: 0,
      targetCount: this.getWeekTargetCount(weekNumber)
    };
    this.saveFamilyData();

    return challenge;
  }

  // Log completion
  logCompletion(persona) {
    if (!this.familyData.isPaired) return false;
    if (!this.familyData.weekProgress) return false;

    if (persona === 'parent') {
      this.familyData.weekProgress.parentCompleted += 1;
    } else if (persona === 'teen') {
      this.familyData.weekProgress.teenCompleted += 1;
    }

    this.saveFamilyData();
    return true;
  }

  // Get week target count (for different challenge types)
  getWeekTargetCount(week) {
    const targets = {
      1: 3, // 3 dinners
      2: 5, // 5 nights
      3: 3, // 3 sessions
      4: 1, // 1 activity
      5: 1, // 1 conversation
      6: 1, // 1 reflection
      7: 2, // 2 conversations
      8: 1, // 1 connection activity
      9: 2, // 2 feed audits
      10: 1, // imperfection practice
      11: 5, // 5 days boundary maintained
      12: 1  // values conversation + action
    };
    return targets[week] || 1;
  }

  // Get current week challenge
  getCurrentChallenge() {
    if (!this.familyData.currentWeek) return this.weeklySharedChallenges[0];
    return this.weeklySharedChallenges[this.familyData.currentWeek - 1];
  }

  // Get progress for display
  getProgress() {
    return {
      isPaired: this.familyData.isPaired,
      currentWeek: this.familyData.currentWeek || 1,
      weekProgress: this.familyData.weekProgress,
      totalWeeksCompleted: this.familyData.totalWeeksCompleted || 0
    };
  }

  // Get both personas' progress
  getSharedProgress() {
    if (!this.familyData.isPaired) return null;

    const progress = this.familyData.weekProgress || {};
    const target = progress.targetCount || 1;

    return {
      parentCompleted: progress.parentCompleted || 0,
      teenCompleted: progress.teenCompleted || 0,
      targetCount: target,
      parentPercentage: Math.min(100, Math.round(((progress.parentCompleted || 0) / target) * 100)),
      teenPercentage: Math.min(100, Math.round(((progress.teenCompleted || 0) / target) * 100)),
      bothOnTrack: (progress.parentCompleted || 0) >= target && (progress.teenCompleted || 0) >= target
    };
  }

  // Complete week and move to next
  completeWeek() {
    if (this.familyData.currentWeek) {
      this.familyData.totalWeeksCompleted = (this.familyData.totalWeeksCompleted || 0) + 1;
    }
    this.familyData.currentWeek = (this.familyData.currentWeek || 1) + 1;
    if (this.familyData.currentWeek > this.weeklySharedChallenges.length) {
      this.familyData.currentWeek = 1; // Loop back to week 1
    }
    this.familyData.weekProgress = null;
    this.saveFamilyData();
  }

  // Reset week progress
  resetWeekProgress() {
    this.familyData.weekProgress = {
      parentCompleted: 0,
      teenCompleted: 0,
      targetCount: this.getWeekTargetCount(this.familyData.currentWeek || 1)
    };
    this.saveFamilyData();
  }

  loadFamilyData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {
        isPaired: false,
        parentCode: null,
        currentWeek: 1,
        totalWeeksCompleted: 0
      };
    } catch (error) {
      console.error('Error loading family data:', error);
      return {
        isPaired: false,
        parentCode: null,
        currentWeek: 1,
        totalWeeksCompleted: 0
      };
    }
  }

  saveFamilyData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.familyData));
    } catch (error) {
      console.error('Error saving family data:', error);
    }
  }

  loadAffirmations() {
    try {
      const stored = localStorage.getItem(this.affirmationKey);
      return stored ? JSON.parse(stored) : {
        parentForTeen: [],
        teenForParent: []
      };
    } catch (error) {
      return { parentForTeen: [], teenForParent: [] };
    }
  }

  saveAffirmations() {
    try {
      localStorage.setItem(this.affirmationKey, JSON.stringify(this.affirmations));
    } catch (error) {
      console.error('Error saving affirmations:', error);
    }
  }

  // Parent writes affirmation for teen
  addParentAffirmation(message) {
    if (!this.familyData.isPaired) return false;
    this.affirmations.parentForTeen.push({
      message: message,
      createdAt: new Date().toISOString()
    });
    this.saveAffirmations();
    return true;
  }

  // Teen writes affirmation for parent
  addTeenAffirmation(message) {
    if (!this.familyData.isPaired) return false;
    this.affirmations.teenForParent.push({
      message: message,
      createdAt: new Date().toISOString()
    });
    this.saveAffirmations();
    return true;
  }

  getParentAffirmations() {
    return this.affirmations.parentForTeen;
  }

  getTeenAffirmations() {
    return this.affirmations.teenForParent;
  }

  // Get all challenges for reference
  getAllChallenges() {
    return this.weeklySharedChallenges;
  }

  init() {
    window.parentTeenTogetherHandler = this;
  }
}

const parentTeenTogetherHandler = new ParentTeenTogetherHandler();
parentTeenTogetherHandler.init();
