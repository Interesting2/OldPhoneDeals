const { format } = require('date-fns');
const { v4: uuid } = require('uuid')
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), 'yyyy/MM/dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    const logFilePath = path.join(__dirname, '..', 'logs', logFileName);

    try {
        if (!fs.existsSync(path.join('__dirname', '..', 'logs'))) {
            await fsPromises.mkdir(path.join('__dirname', '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(logFilePath), logItem); 
    } catch (err) {
        console.log(err);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next()
}

module.exports = { logEvents, logger }
// module.exports.logEvents = logEvents;
// module.exports.logger = logger;