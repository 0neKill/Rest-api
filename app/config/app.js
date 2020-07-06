module.exports = {
    URL: 'mongodb://localhost:27017/LauncherMinecraft',
    PORT: 3000,
    Mongo: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    },
    jwt: {
        secret: 'privet',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '3m'
            },
            refresh: {
                type: 'refresh',
                expiresIn: '4m'

            },
            start: {
                type: 'start',
                expiresIn: '3m'
            }
        }
    }
};
