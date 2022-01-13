const { Ticket, User, Status, TicketAnswer } = require('../models/models')

class ticketController {

    async getAllTicket(req, res) {

        try {
            const isAuthorised = req.user
            const undecodedToken = req.user;
            console.log(undecodedToken)
            if (undecodedToken.role !== ('ADMIN' || 'OWNER')) {
                res.redirect('tickets/form')
            }
            const allTickets = await Ticket.findAll({
                where: {
                    statusId: 1
                },
                raw: true
            })
            res.render('TicketList', { allTickets, isAuthorised })
        } catch (error) {
            console.log(error.message);
        }

    }

    async createTicket(req, res) {
        try {
            const newTicket = await Ticket.create({
                userId: req.user.id,
                title: req.body.title,
                description: req.body.description,
                statusId: 1
            })
            res.json(newTicket)
        } catch (error) {
            console.log(error.message);
        }
    }

    renderFormForTickets(req, res) {
        const isAuthorised = req.user
        console.log(req.user)
        return res.render('TicketForm', { isAuthorised })
    }

    async editTicket(req, res) {

        try {
            const editedTicket = await Ticket.update({ statusId: 3 }, { where: { id: req.body.ticketId } })
            const newTicketAnswer = await TicketAnswer.create({
                ticketId: req.body.ticketId,
                answer: req.body.inputValue,
                adminId: req.user.id,
            })
            if (newTicketAnswer.ticketId) {
                res.sendStatus(200)
            } else {
                res.sendStatus(500)
            }

        } catch (error) {
            console.log(error.message);
        }
    }

    async cancelTicket(req, res) {
        try {
            const editedTicket = await Ticket.update({ statusId: 4 }, { where: { id: req.body.ticketId } })
            const newTicketAnswer = await TicketAnswer.create({
                ticketId: req.body.ticketId,
                answer: 'Отклонено',
                adminId: req.user.id,
            })
            res.sendStatus(200)
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = new ticketController()