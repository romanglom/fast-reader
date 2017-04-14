const wordUtils = (() => {

    const REGEX_END_DOT = /\.$/;
    const REGEX_END_COMMA = /,$/;
    const EXTRA_TIME_END_DOT = 100;
    const EXTRA_TIME_END_COMMA = 50;

    let getExtraTime = word => {
        if (REGEX_END_DOT.test(word)) {
            return EXTRA_TIME_END_DOT;
        }
        if (REGEX_END_COMMA.test(word)) {
            return EXTRA_TIME_END_COMMA;
        }
        return 0;
    };

    return {
        getExtraTime: getExtraTime,
    }

})();

export default wordUtils;