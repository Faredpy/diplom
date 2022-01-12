exports.createOrder = async (req, res) => {
  const {
    product, name, phone, email, date,
  } = req.body;

  const telReg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/m;
  const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!telReg.test(phone)
  || !emailReg.test(email)
  || !product.length
     ) {
    console.log('Не удалось создать заказ');
    res.json({ isSuccess: false });
  }

  const newProduct = await Promise.all(
    services.map(async (el) => product.findOne({ where: { id: el } })),
  );

  const user = await user.findOne({ where: { phone } });

  let order;

  if (user) order = await product.findOne({ where: { client_id: client?.id } });

  try {
    if (user && order) { // клиент есть и уже были заказы
      console.log('клиент есть и уже были заказы');

      const newOrder = await Order.create({
        user_id: user.id,
        price: newProduct.reduce((acc, el) => acc + el.price, 0),
        date,
      });

      newServices.forEach(async (el) => {
        await ManyOrder.create({
          product_id: el.id,
          order_id: newOrder.id,
        });
      });

      res.json({ isSuccess: true, newOrder });
    } else if (client || order) { // клиент есть, но ещё не было заказа
      console.log('клиент есть, но ещё не было заказа');

      const newOrder = await Order.create({
        client_id: client.id,
        price: newProduct.reduce((acc, el) => acc + el.price, 0),
        date,
      });


      newServices.forEach(async (el) => {
        await ManyOrder.create({
          product_id: el.id,
          order_id: newOrder.id,
        });
      });

      res.json({ isSuccess: true, newOrder });
    } else { // новый клиент
      console.log('новый клиент');
      const newClient = await Client.create({ name, phone, email });

      const newOrder = await Order.create({
        user_id: user.id,
        price: newServices.reduce((acc, el) => acc + el.price, 0),
        date,
      });

      newProduct.forEach(async (el) => {
        await ManyOrder.create({
          product_id: el.id,
          order_id: newOrder.id,
        });
      });

      res.json({ isSuccess: true, newOrder });
    }
  } catch (err) {
    console.log('Не удалось создать заказ', err);
    res.json({ isSuccess: false });
  }
};

