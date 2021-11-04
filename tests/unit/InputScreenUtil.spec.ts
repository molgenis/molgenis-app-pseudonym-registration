import {submitPseudonymRegistration} from '@/views/InputScreenUtil';
// import api from '@molgenis/molgenis-api-client';

jest.mock('@molgenis/molgenis-api-client', () => ({
  get: jest.fn(),
  post: jest.fn()
}));

describe('InputScreenUtil', () => {
  describe('submitPseudonymRegistration', () => {
    // beforeEach(() => {});

    const originalId = 'theOriginalIdentifier';
    const newPseudonym = 'newPseudonymId';

    it('should fail', (done) => {});
  });
});
