import {mount} from 'vue-test-utils';

let test = () => {
    return true;
};
describe('测试', () => {
    it('验证测试', () => {
        expect(test()).toBe(true);
    });
})
;