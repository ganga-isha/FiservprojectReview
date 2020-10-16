
import { Router } from 'express';
import { FixedWidthParser } from 'fixed-width-parser';
const parseRouter = Router();
const fixedWidthParser = new FixedWidthParser([
    {
        name: 'firstName',
        start: 0,
        width: 8
    },
    {
        name: 'lastName',
        start: 8,
        width: 10
    },
    {
        name: 'phoneNumber',
        start: 18,
        width: 7
    }
]);

parseRouter.post('/api/v1/parse', (req, res) => {
    const reqData: string = req.body.data;
    const result = fixedWidthParser.parse(reqData);
    res.send({ status: 200, data: result[0] });
});

parseRouter.post('/api/v2/parse', (req, res) => {
    const reqData: string = req.body.data;
    const result: any[] = fixedWidthParser.parse(reqData);
    const response =
    {
        firstName: result[0].firstName.replace(/0/g, ""),
        lastName: result[0].lastName.replace(/0/g, ""),
        clientId: result[0].phoneNumber
    };
    res.send({ status: 200, data: response });
});


export default parseRouter;