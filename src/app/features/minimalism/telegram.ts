import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TelegramService {

    token = '8510001546:AAGWWkEpjQsq88qy2clmbpKSZZJIAVwS7Ns';
    chatId = '1818936920';

    send(data: { name: string; surname: string; come: string; guests: number | null }) {

        const text =
            `Новый гость:

Անուն: ${data.name}
Ազգանուն: ${data.surname}
Կգա: ${data.come}
Հյուրերի քանակ: ${data.guests ?? 0}`;

        fetch(`https://api.telegram.org/bot${this.token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: this.chatId,
                text: text
            })
        });

    }

}
