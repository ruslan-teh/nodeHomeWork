import cron from 'node-cron'


export const cronRun = async () => {
    console.log('cron_was started');

    cron.schedule('*/10 * * * * *',() => {
        console.log('cron real work');
    })
}