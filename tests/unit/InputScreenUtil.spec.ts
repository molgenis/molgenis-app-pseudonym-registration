import {
  ApiResponse,
  submitPseudonymRegistration
} from '@/views/InputScreenUtil';
import IPseudonymResult from '@/views/IPseudonymResult';
import api from '@molgenis/molgenis-api-client';

const newPseudonym = 'newPseudonymId';
const getEmptyResponse = {items: [] as {data: {id: string}}[]} as ApiResponse;
const getFilledResponse = {items: [{data: {id: newPseudonym}}]} as ApiResponse;

const postResponse = {status: 201} as Response;

jest.mock('@molgenis/molgenis-api-client');

describe('InputScreenUtil', () => {
  describe('submitPseudonymRegistration', () => {
    afterEach(() => {
      api.get.mockReset();
    });
    const originalId = 'theOriginalIdentifier';
    const newPseudonym = 'newPseudonymId';
    const INFORM_MESSAGE =
      'If you think this is a bug, please inform us at https://github.com/molgenis/molgenis-app-pseudonym-registration/issues';

    it('should create a new pseudonym and return it', (done) => {
      api.get
        .mockResolvedValueOnce(getEmptyResponse)
        .mockResolvedValueOnce(getFilledResponse);
      api.post.mockResolvedValue(postResponse);
      const expectedResult: IPseudonymResult = {
        isDuplicate: false,
        pseudonym: newPseudonym
      };
      submitPseudonymRegistration(originalId).then(
        (result: IPseudonymResult) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      );
    });

    it('should return the pseudonym if it already exists and return true on isDuplicate', (done) => {
      api.get.mockResolvedValueOnce(getFilledResponse);
      const expectedResult: IPseudonymResult = {
        isDuplicate: true,
        pseudonym: newPseudonym
      };
      submitPseudonymRegistration(originalId).catch(
        (result: IPseudonymResult) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      );
    });

    it('should return an error the api fails to get', (done) => {
      api.get.mockRejectedValueOnce({
        statusText: 'reason for error',
        status: 400
      });
      const expectedError = `Error: reason for error (statuscode: 400). ${INFORM_MESSAGE}`;
      submitPseudonymRegistration(originalId).catch(
        (error: IPseudonymResult) => {
          expect(error).toEqual(expectedError);
          done();
        }
      );
    });
  });
});
