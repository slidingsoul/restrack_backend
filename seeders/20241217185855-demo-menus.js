// seeders/20240101010104-demo-menu.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Menus', [
      {
        name: 'Pasta Carbonara',
        category: 'food',
        price: 45000,
        recommended: true,
        image: 'https://example.com/images/pizza-margherita.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Chicken Caesar Salad',
        category: 'food',
        price: 38000,
        recommended: false,
        image: 'https://example.com/images/spaghetti-bolognese.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Nasi Goreng Spesial',
        category: 'food',
        price: 40000,
        recommended: true,
        image: 'https://example.com/images/coca-cola.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Cappuccino',
        category: 'beverage',
        price: 30000,
        recommended: false,
        image: 'https://example.com/images/lemonade.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Lemon Tea',
        category: 'beverage',
        price: 25.000,
        recommended: true,
        image: 'https://example.com/images/caesar-salad.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Menus', null, {});
  },
};
