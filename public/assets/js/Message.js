class Message {

    constructor(message) {
        this.message = message;
    }

    getMessage() {
        return `<i class="bi bi-hand-thumbs-down-fill"></i> ${this.message}!`
    }

}

