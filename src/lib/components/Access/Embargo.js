// This file is part of React-Invenio-Deposit
// Copyright (C) 2020-2021 CERN.
// Copyright (C) 2020-2021 Northwestern University.
//
// React-Invenio-Deposit is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

export class EmbargoState {
  static DISABLED = 'disabled';
  static ENABLED = 'enabled';
  static APPLIED = 'applied';

  static isEnabled(access) {
    return access.record === 'restricted' || access.files === 'restricted';
  }

  static from(access) {
    if (access.embargo && access.embargo.active) {
      return EmbargoState.APPLIED;
    } else if (EmbargoState.isEnabled(access)) {
      return EmbargoState.ENABLED;
    } else {
      return EmbargoState.DISABLED;
    }
  }
}

export class Embargo {
  constructor({ state, date, reason }) {
    this.state = state || EmbargoState.DISABLED;
    this.date = date || '';
    this.reason = reason || '';
  }

  is(state) {
    return this.state === state;
  }
}
