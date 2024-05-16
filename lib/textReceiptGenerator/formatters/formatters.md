# Опис форматерів
Для генерації чеків ми використовуємо бібліотеку `receipt`, яка за замовчуванням 
має наступні формати:

- `ruler`
- `text`
- `empty`
- `propeties`
- `table`

Ці формати мають обмеження, наприклад, `table` підтримує лише певні (захардкоджені 
імена стовпців). Але також ця бібліотека підтримує можливість розширення кастомними 
форматами.

Таким чином, ми додали ще декілька форматів:

- `smartTable` - форматер для таблиці, яка використовує під капотом або `narrowTable`, 
- або `wideTable`, залежно від ширини чека.
- `smartProperties`.
- `summary`

Розглянемо кожен з них детальніше.

## Ruler
Це просто рядок символів, які вказані в конфігурації, за замовчуванням це `-`. 
Використовується для розділення різних блоків чека.
```
Data example:                         Receipt example:
[                                     '--------------------'
  { type: 'ruler'}    
]
```

## Text
Текст з можливістю вирівнювання по лівому, центральному та правому краю.
```
Data example:                         Receipt example:
[                                     'Test value left                         ',  
   {                                  '         Test value center line1        ',
      type: 'text',                   '         Test value center line2        ',
      value: 'Test value left',       '                        Test value right',
      align: 'left',
   },
   {
      type: 'text',
      value: [
         'Test value center line1',
         'Test value center line2',
      ],
      align: 'center',
   },
   {
      type: 'text',
      value: 'Test value right',
      align: 'right',
   }
]
```

## Empty
Порожній рядок, який використовується для розділення різних блоків чека.
```
Data example:                         Receipt example:
[                                     ' ',
  { type: 'empty'}    
]
```

## SmartProperties
Формує таблицю з двома колонками: назва та значення. На відміну від стандартного 
`properties`, де колонка назв отримує ширину найдовшого рядка назви, ширина колонок 
буде у пропорції 4:6. Також є можливість приховувати деякі рядки.
```
Data example:                                              Receipt example:
[                                                          'Официан             Сергей                        ',
  {                                                        'Цех                 Кухня                         ',
    type: 'smartProperties',                               'Стіл №              1 (Основний зал)              ',
    lines: [                                               'Тип замовлення      У закладі                     ',
      { name: "Официан", value: "Сергей" },
      { name: "Цех", value: "Кухня" },
      { name: "Стіл №", value: "1 (Основний зал)" },
      { name: "Тип замовлення", value: "У закладі" },
      { name: "Комментарии", value: "", hide: true },
    ],
  },
]
```

## SmartTable
Під капотом вона застосовує або `narrowTable`, або `wideTable` в залежності від 
ширини чека.

### NarrowTable
NarrowTable - таблиця для чеків малої ширини. Вирівнює назву по лівому краю, а 
кількість, ціну та загальну суму - по правому. Якщо вся позиція не поміщається в 
одному рядку, назва друкується в першому, а кількість, ціна та загальна сума - в 
другому рядку. Ігнорує заголовок таблиці. (Повторює старий формат текстового чека). 
Дані однакові як для `narrowTable`, так і для `wideTable`.
``` 
Data example with long line:                                           Receipt example:
[                                                                      '------------------------------',
  {                                                                    'Сирна паличка                 ',
     type: 'smartTable',                                               '   1 шт. 200.00грн. 200.00грн.',
     headers: [                                                        'Морозиво                      ',
        {name: 'Назва', relation: 10},                                 '    2 шт. 92.13грн. 184.26грн.',
        {name: 'Кількість', relation: 10},
        {name: 'Ціна', relation: 10},
        {name: 'Сума', relation: 10},
     ],
     items: [
        ['Сирна паличка', '1 шт.', '200.00грн.', '200.00грн.'],
        ['Морозиво', '2 шт.', '92.13грн.', '184.26грн.'],
     ],
  },
]

Data example short line:                                               Receipt example:
[                                                                      '------------------------------',
  {                                                                    'Сирна паличка             1шт.',
     type: 'smartTable',                                               'Морозиво                  2шт.',
     items: [
        ['Сирна паличка', '1шт.'],
        ['Морозиво', '2шт.'],
     ],
  },
]
```

### WideTable
WideTable - таблиця для чеків "широкої" ширини. Формує повноцінну таблицю як з 
заголовком, так і без нього. Ширину стовбців можна задати за допомогою властивості 
relation.
```
Data example whit header:                                             Receipt example:
[                                                                     '---------------------------------',
  {                                                                   'Назва           Кількість   Ціна ',
     type: 'smartTable',                                              '                                 ',
     headers: [                                                       'Сирна паличка   1 шт.      200.00',
        {name: 'Назва', relation: 10},                                'Морозиво        2 шт.       92.13',
        {name: 'Кількість', relation: 5},                             '---------------------------------',
        {name: 'Ціна', relation: 5},
     ],
     items: [
        ['Сирна паличка', '1 шт.', '200.00'],
        ['Морозиво', '2 шт.', '92.13'],
     ],
  },
]

Data example without header:                                          Receipt example:
[                                                                     '---------------------------------',
  {                                                                   'Сирна паличка              200.00',
     type: 'smartTable',                                              'Морозиво                    92.13',
     items: [
        ['Сирна паличка',  200.00'],
        ['Морозиво',       '92.13'],
     ],
  },
]
```