const td = require('testdouble');
const inputScreenUtil = require('@/views/InputScreenUtil');
const api = require('@molgenis/molgenis-api-client');

describe('InputScreenUtil', () => {
  describe('submitPseudonymRegistration', () => {
    beforeEach(() => {
      td.reset();
    });

    const originalId = 'theOriginalIdentifier';
    const newPseudonym = 'newPseudonymId';

    it('should fail', (done) => {
      const get = td.function('api.get');
      const post = td.function('api.post');
      td.when(
        post('/api/data/PseudonymRegistration', {
          body: `{"OriginalId":${originalId}}`
        })
      ).thenResolve({status: 201});
      td.when(
        get(`/api/data/PseudonymRegistration?q=OriginalId==${originalId}`)
      ).thenResolve({items: [{data: {id: newPseudonym}}]});
      td.replace(api, 'get', get);
      td.replace(api, 'post', post);
      inputScreenUtil.submitPseudonymRegistration(originalId).then((result) => {
        expect(result).toEqual('newPseudonymId');
        done();
      });
    });
  });
});
