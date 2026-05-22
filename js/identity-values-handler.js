// Identity & Values Handler - Foundational layer for teens to articulate who they are
// Core insight: teens who view their identity as personally meaningful have lower depression/suicide rates

class IdentityValuesHandler {
  constructor() {
    this.storageKey = 'teenIdentityValues';
    this.data = this.loadData();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : {
        identities: [], // things they identify as
        values: [],     // what matters to them
        completedAt: null
      };
    } catch (error) {
      console.error('Error loading identity data:', error);
      return { identities: [], values: [], completedAt: null };
    }
  }

  saveData() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    } catch (error) {
      console.error('Error saving identity data:', error);
    }
  }

  // Add identity
  addIdentity(identity) {
    if (!this.data.identities.includes(identity)) {
      this.data.identities.push(identity);
      this.saveData();
    }
  }

  // Remove identity
  removeIdentity(identity) {
    this.data.identities = this.data.identities.filter(id => id !== identity);
    this.saveData();
  }

  // Add value
  addValue(value) {
    if (!this.data.values.includes(value)) {
      this.data.values.push(value);
      this.saveData();
    }
  }

  // Remove value
  removeValue(value) {
    this.data.values = this.data.values.filter(v => v !== value);
    this.saveData();
  }

  // Mark as completed
  markCompleted() {
    this.data.completedAt = new Date().toISOString();
    this.saveData();
  }

  // Get data
  getIdentities() {
    return this.data.identities;
  }

  getValues() {
    return this.data.values;
  }

  isCompleted() {
    return this.data.identities.length > 0 && this.data.values.length > 0;
  }

  init() {
    window.identityValuesHandler = this;
  }
}

const identityValuesHandler = new IdentityValuesHandler();
identityValuesHandler.init();
