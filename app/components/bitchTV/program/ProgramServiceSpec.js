describe('ProgramService', function () {
    var ProgramService;

    beforeEach(module('BitchTV'));

    beforeEach(inject(function (_ProgramService_) {
        ProgramService = _ProgramService_;
    }));

    describe('getProgramImgSrc', function () {
        it('should get the icon', function () {
            var program = {icon: {src: 'src'}};
            var src = ProgramService.getProgramImgSrc(program);
            expect(src).toBe('src');
        });

        //it('should return the default icon, since there is none', function () {
        //    var program = {};
        //    var channel = {icon: {src: ''}};
        //    var src = ProgramService.getProgramImgSrc(program, channel);
        //    expect(src).toBe('src');
        //});
    });
});