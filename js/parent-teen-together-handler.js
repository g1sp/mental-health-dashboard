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
      6: 1  // 1 reflection
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
