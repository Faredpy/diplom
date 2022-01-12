const { Ticket, User, Status, TicketAnswer } = require('../models/models')

class ticketController {

    async getAllTicket(req, res) {

        try {
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
            res.render('TicketList', { allTickets })
        } catch (error) {
            console.log(error.message);
        }

    }

    async createTicket(req, res) {

        try {
            const newTicket = await Ticket.create({
                userId: req.user.id,
                description: req.body.description,
                statusId: 1
            })
            console.log(newTicket);
            if (newTicket.userId) {
                res.sendStatus(200)
                res.setHeader('Content-Type', 'text/html')
                return res.json(newTicket)
            } else {
                res.sendStatus(500)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    renderFormForTickets(req, res) {

        res.render('TicketForm')

    }

    async editTicket(req, res) {

        try {
            const editedTicket = await Ticket.update({ statusId: 3 }, { where: { id: req.body.ticketId } })
            const newTicketAnswer = await TicketAnswer.create({
                ticketId: req.body.ticketId,
                answer: req.body.inputValue,
                adminId: req.user.id,
            })
            res.sendStatus(200)
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