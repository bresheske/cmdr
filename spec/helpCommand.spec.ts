import { helpCommand } from "../options/helpCommand";
import { expect } from "chai";

describe ('Help Commands', () => {

    it('should display a help window', async() => {
        let str = await helpCommand();
        expect(str).not.equal(null);
        expect(str.length).greaterThan(0);
    });

});