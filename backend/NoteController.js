const Note = require('./Note');

module.exports = {
	create: function (req, res, next) {
		/* 
			Para efeitos de praticalidade, vamos assumir que os dados estão a ser
			recebidos com o formato correto
		*/
		const note = new Note(req.body);

		Note.create(note, (err, doc) => {
			if (err) next(err);
			else res.status(201).end();
		});
	},
	readAll: function (req, res, next) {
		Note.find({}, (err, docs) => {
			if (err) next(err);
			else res.status(200).json(docs);
		});
	},
	update: async function (req, res, next) {
		const noteID = req.params.id;
		const note = await Note.findOne({ _id: noteID });

		if (!note) return;

		const updatedNote = await Note.findOneAndUpdate(
			{ _id: noteID }, req.body,
			{ new: true }
		);

		if (!updatedNote) return res.status(500).end();
		return res.status(200).json(updatedNote);
	},
	delete: async function (req, res, next) {
		const noteID = req.params.id;
		const note = await Note.findOne({ _id: noteID });

		if (!note) return;

		Note.findOneAndRemove({ _id: noteID }, (err, doc) => {
			if (err) next(err);
			else return res.status(204).end();
		});
	}
}
