const { NlpManager } = require('node-nlp');

// 1. Создаём менеджер для работы с NLP (указываем язык — русский)
const manager = new NlpManager({ languages: ['ru'], forceNER: true });

// 2. Добавляем запросы для обучения — они будут кластерами (интентами)
manager.addDocument('ru', 'ремонт ноутбуков в Москве', 'repair.laptop');
manager.addDocument('ru', 'замена экрана ноутбука', 'repair.laptop');
manager.addDocument('ru', 'ремонт компьютеров', 'repair.computer');
manager.addDocument('ru', 'починка зарядного устройства ноутбука', 'repair.laptop');

manager.addDocument('ru', 'купить ноутбук', 'buy.laptop');
manager.addDocument('ru', 'где купить ноутбук дешево', 'buy.laptop');
manager.addDocument('ru', 'заказать ноутбук онлайн', 'buy.laptop');

// 3. Тренируем модель
(async () => {
    console.log('Обучение модели...');
    await manager.train();
    console.log('Модель обучена ✅\n');

    // 4. Проверка кластеризации на новых запросах
    const queries = [
        'ремонт зарядки для ноутбука',
        'купить ноутбук в рассрочку',
        'замена клавиатуры на ноутбуке',
        'ремонт системного блока',
        'ноутбук недорого'
    ];

    for (let query of queries) {
        const res = await manager.process('ru', query);
        console.log(`Запрос: "${query}"`);
        console.log(` → Кластер (интент): ${res.intent}`);
        console.log(` → Точность: ${(res.score * 100).toFixed(2)}%`);
        console.log('---');
    }
})();