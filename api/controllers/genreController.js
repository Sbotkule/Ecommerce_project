const Genre = require('../models/Genre');

exports.getAllGenres = async (req, res) => {
    try {
        console.log("Fetching genres...");
        const allGenres = await Genre.find({});

        res.status(200).json({
            allGenres
        });
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);

        res.status(200).json({
            genre
        });
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.addGenre = async (req, res) => {
    try {
        console.log("Adding genre:", req.body);
        const newGenre = await Genre.create({
            name:req.body.name,
            genre:req.body.genre,
            status:req.body.status
        });

        res.status(201).json({
            newGenre
        });
    } catch (error) {
        console.error("Error adding genre:", error);
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.updateGenre = async (req, res) => {
    try {
        console.log("Updating genre:", req.body);
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            genre
        });
    } catch (error) {
        console.error("Error updating genre:", error);
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};

exports.deleteGenre = async (req, res) => {
    try {
        console.log("Deleting genre:", req.params.id);
        const genre = await Genre.findByIdAndDelete(req.params.id);
        res.status(200).json({
            genre
        });
    } catch (error) {
        console.error("Error deleting genre:", error);
        res.status(400).json({
            status: 'failed',
            error
        });
    }
};
