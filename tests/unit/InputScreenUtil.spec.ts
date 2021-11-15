import {
  ApiResponse,
  submitPseudonymRegistration,
  validateInput
} from '@/logic/InputScreenUtil';
import IPseudonymResult from '@/logic/IPseudonymResult';
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
      'If you think this is a bug, please inform us at: https://github.com/molgenis/molgenis-app-pseudonym-registration/issues';
    const errorResponse = {
      statusText: 'reason for error',
      status: 400
    };
    const failedToGetError = `Error: reason for error (statuscode: 400). ${INFORM_MESSAGE}`;

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
      submitPseudonymRegistration(originalId).then(
        (result: IPseudonymResult) => {
          expect(result).toEqual(expectedResult);
          done();
        }
      );
    });

    it('should return an error if the api fails to get', (done) => {
      api.get.mockRejectedValueOnce(errorResponse);
      submitPseudonymRegistration(originalId).catch(
        (error: IPseudonymResult) => {
          expect(error).toEqual(failedToGetError);
          done();
        }
      );
    });

    it('should return an error if the api fails process the post', (done) => {
      api.get.mockResolvedValueOnce(getEmptyResponse);
      api.post.mockRejectedValueOnce({
        statusText: 'reason for error',
        status: 401
      });
      const expectedError = `Error: reason for error (statuscode: 401). ${INFORM_MESSAGE}`;
      submitPseudonymRegistration(originalId).catch(
        (error: IPseudonymResult) => {
          expect(error).toEqual(expectedError);
          done();
        }
      );
    });

    it('should return an error if the api returns a non-error code that is not 201', (done) => {
      api.get.mockResolvedValueOnce(getEmptyResponse);
      const unexpectedPostResponse = {
        status: 200,
        statusText: 'Ok'
      } as Response;
      api.post.mockResolvedValueOnce(unexpectedPostResponse);
      const expectedError = `Error: Ok (statuscode: 200). ${INFORM_MESSAGE}`;
      submitPseudonymRegistration(originalId).catch(
        (error: IPseudonymResult) => {
          expect(error).toEqual(expectedError);
          done();
        }
      );
    });

    it('should return an error if it fails to retrieve the just created pseudonym', (done) => {
      api.get.mockResolvedValueOnce(getEmptyResponse);
      api.post.mockResolvedValueOnce(postResponse);
      api.get.mockRejectedValueOnce(errorResponse);
      submitPseudonymRegistration(originalId).catch(
        (error: IPseudonymResult) => {
          expect(error).toEqual(failedToGetError);
          done();
        }
      );
    });
  });

  describe('validateInput', () => {
    const SPECIAL_CHARACTER_WARNING =
      'Id cannot contain these characters: # ^ " \\ & | { } [ ] `';

    it('should return an empty string for valid input', () => {
      const validInput = 'valid input';
      expect(validateInput(validInput)).toEqual('');
    });

    it('should return an error message for input with double quotes', () => {
      const doubleQuoteInput = '"invalid input"';
      expect(validateInput(doubleQuoteInput)).toEqual(
        SPECIAL_CHARACTER_WARNING
      );
    });

    it('should return an error message for input with backslashes', () => {
      const backslashInput = 'invalid\\input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with &', () => {
      const backslashInput = 'invalid&input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with |', () => {
      const backslashInput = 'invalid|input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with {', () => {
      const backslashInput = 'invalid{input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with }', () => {
      const backslashInput = 'invalid}input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with [', () => {
      const backslashInput = 'invalid[input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with ]', () => {
      const backslashInput = 'invalid]input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with back ticks', () => {
      const backslashInput = 'invalid`input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with #', () => {
      const backslashInput = 'invalid#input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for input with ^', () => {
      const backslashInput = 'invalid^input';
      expect(validateInput(backslashInput)).toEqual(SPECIAL_CHARACTER_WARNING);
    });

    it('should return an error message for empty input', () => {
      const emptyInput = '';
      expect(validateInput(emptyInput)).toEqual('Please enter an id.');
    });
  });
});
