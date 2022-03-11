const mongooseConfiguration = {
    setup(mongoose: any, url: string): void  {
        mongoose.Promise = global.Promise;
        mongoose.connect(url);
    }
};

export default mongooseConfiguration;