const mongoose = require("mongoose");
const { getUserConnecte } = require("../middleware/userConnecte");
const Seance = require("../models/seance");
const jwt = require("jsonwebtoken");

const userConnecte = require("./user");

exports.getAllSeances = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_KEY);
      console.log(decodedToken);
      console.log(decodedToken.userId);
      a = JSON.stringify(decodedToken.userId);

      let q = Seance.find();

      q.populate("enseignant")
        .populate("user")
        .exec()
        .then((seances) => {
          const response = {
            count: seances.length,
            seances: seances.map((seance) => {
              return {
                _id: seance._id,
                name: seance.name,
                enseignant: seance.enseignant,
                user: seance.user,
                dateDebut: seance.dateDebut,
                dateFin: seance.dateFin,
                type: seance.type,
              };
            }),
          };

          res.status(200).json(response);
        })
        .catch((error) => {
          console.log(error);
          next(error);
        });
    }
  }
};
exports.getAllSeancesCalendar = (req, res, next) => {
  Seance.find()

    .exec()
    .then((seances) => {
      const response = {
        count: seances.length,
        seances: seances.map((seance) => {
          return {
            title: seance.name,

            start: seance.dateDebut,
            end: seance.dateFin,
          };
        }),
      };
      res.status(200).send(response);
    })
    .catch((error) => {
      next(error);
    });
};
exports.createOneSeance = (req, res, next) => {
  const ens = createSeance(
    req.body.name,
    req.body.enseignant,
    req.body.user,
    req.body.dateDebut,
    req.body.dateFin,
    req.body.type
  );
  return ens
    .save()

    .then((seance) => {
      return res.status(201).json({
        message: "seance created successfully!",
        seance: {
          _id: seance._id,
          name: seance.name,
          enseignant: seance.enseignant,
          user: seance.user,
          dateDebut: seance.dateDebut,
          dateFin: seance.dateFin,
          type: seance.type,
        },
      });
    })
    .catch((error) => {
      next(error);
    });
};
exports.updateOneSeance = (req, res, next) => {
  const seanceId = req.params.seanceId;

  Seance.update({ _id: seanceId }, { $set: req.body })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Updated seance Successfully!",
        result: result,
      });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteSeance = (req, res, next) => {
  const seanceId = req.params.seanceId;
  Seance.deleteOne({ _id: seanceId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Seance Deleted Successfully!",
      });
    })
    .catch((error) => {
      error.message = "Could Not Delete Seance!";
      next(error);
    });
};

function createSeance(name, enseignant, user, dateDebut, dateFin, type) {
  return new Seance({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    enseignant: enseignant,
    user: user,
    dateDebut: dateDebut,
    dateFin: dateFin,
    type: type,
  });
}

exports.getTotalSeanceCount = (req, res, next) => {
  return Seance.find()
    .exec()
    .then((seances) => {
      const response = {
        count: seances.length,
      };
      res.status(200).json(response);
    });
};
