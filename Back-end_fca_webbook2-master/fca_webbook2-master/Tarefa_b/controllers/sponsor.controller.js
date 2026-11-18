const Sponsor = require("../models/sponsor.model");
const { validationResult } = require("express-validator");

// LISTAR PATROCINADORES
exports.get = (req, res) => {
    Sponsor.find({})
        .populate("animal", "name")
        .exec((error, sponsors) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao obter patrocinadores."
                });
            }

            return res.status(200).send({
                body: sponsors
            });
        });
};

// ADICIONAR PATROCINADOR
exports.create = (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.status(406).send(errors);
    }

    new Sponsor({
        name: req.body.name,
        contact: req.body.contact,
        animal: req.body.animal
    }).save((error, sponsor) => {
        if (error) {
            return res.status(500).send({
                message: "Erro ao adicionar patrocinador."
            });
        }

        return res
            .status(201)
            .header("location", "/sponsors/" + sponsor._id)
            .send({
                body: sponsor
            });
    });
};

// EDITAR PATROCINADOR
exports.update = (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.status(406).send(errors);
    }

    Sponsor.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true },
        (error, sponsor) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao atualizar patrocinador."
                });
            }

            if (!sponsor) {
                return res.status(404).send({
                    message: "Patrocinador não encontrado."
                });
            }

            return res.status(200).send({
                body: sponsor
            });
        }
    );
};

// REMOVER PATROCINADOR
exports.delete = (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.status(406).send(errors);
    }

    Sponsor.deleteOne(
        { _id: req.params.id },
        (error, result) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao remover patrocinador."
                });
            }

            if (result.deletedCount <= 0) {
                return res.status(404).send({
                    message: "Patrocinador não encontrado."
                });
            }

            return res.status(200).send({
                message: "Patrocinador removido com sucesso."
            });
        }
    );
};

// OBTER UM PATROCINADOR
exports.getOne = (req, res) => {
    Sponsor.findOne({ _id: req.params.id })
        .populate("animal", "name")
        .exec((error, sponsor) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao obter patrocinador."
                });
            }

            if (!sponsor) {
                return res.status(404).send({
                    message: "Patrocinador não encontrado."
                });
            }

            return res.status(200).send({
                body: sponsor
            });
        });
};
