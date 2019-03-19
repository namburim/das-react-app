import { createBrowserHistory } from 'history';




function createBrowserHistoryWithListener() {
    let history = createBrowserHistory({
        getUserConfirmation: (message, callback) => getConfirmation(message, callback)
    });

    return history;
}

export const getConfirmation = (message, callback) => {
    //router navigation comfirmation message.
    const options = {
        onOk: function () {
            return callback(true);
        },
        onCancel: function () {
            return callback(false);
        },
        okText: 'Yes',
        cancelText: 'No',
        transitionIn: 'bounceIn',
        transitionOut: 'bounceOut'
    };
}


const customHistory = createBrowserHistoryWithListener();
export { customHistory };