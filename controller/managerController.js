const { Tag, User, UserTag } = require('../models/models');

class managerController {
  async getAllManagers(req, res) {
    const tag = await Tag.findOne({ where: { title: req.body.tagsInputValue } });
    if (!tag.id) {
      res.sendStatus(500)
    }
    const allManagers = await Tag.findAll({
      where: { id: tag.id },
      include: {
        model: User,
        through: {
          model: UserTag,
          attributes: []
        }
      }
    })
    const managersRaw = allManagers[0].dataValues.Users
    managersRaw[0].dataValues.tagId = tag.id
    managersRaw[0].dataValues.tagTitle = tag.title
    res.json({ managersRaw })
  }
}

module.exports = new managerController()