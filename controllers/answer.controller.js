import Answer from "../models/answer.js";
import Question from "../models/questions.js"


export const checkAnswer = (req, res) => {
    const { answerUser} = req.body;
    const userId = req.userId; 

    //mengambil jumlah total soal dari tabel question

    Question.countQuestions((err, totalQuestions) => {
        if (err) {
            res.status(500).send({ msg: "Error counting questions" });
            return;
        }

    const pointsPerQuestion = 100 / totalQuestions;
    console.log(req.userId);
    Answer.findById([req.params.id], (err, results) => {
        if (err) {
            console.log(err);
            res.status(500).send({ msg: "exist some error" });
            return;
        }
        if (results.length === 0) {
            res.status(404).send({
                message: `not found question with id: ${req.params.id}`
            });
            return;
        }

        let pointBenar = 0;

        if (answerUser === results.correct_answer) {
            pointBenar += pointsPerQuestion;
            res.json({ msg: "Jawaban Benar" });
        } else {
            res.json({ msg: "Jawban Salah" });
        }

        Answer.findByUserId(userId, (err, result) => {
            console.log(userId);
            if (err) {
                res.status(500).send({ msg: "Error retrieving user result" });
                return;
            }

            let newScore = pointBenar;
            let grade = '';

            if (result) {
                newScore += result.nilai;
                // grade = newScore >= 80 ? 'A' : result.grade;
                if (newScore > 90) {
                    grade = 'A';
                } else if (newScore > 70) {
                    grade = 'B';
                } else {
                    grade = 'C';
                }

                Answer.update(result.id, newScore, grade, (err, updatedResult) => {
                    if (err) {
                        res.status(500).send({ msg: "Error updating user result" });
                        return;
                    }
                    console.log(updatedResult);
                });
            } else {
                // grade = newScore >= 30 ? 'A' : '';
                if (newScore > 90) {
                    grade = 'A';
                } else if (newScore > 70) {
                    grade = 'B';
                } else {
                    grade = 'C';
                }

                Answer.create(userId, newScore, grade, (err, savedResult) => {
                    if (err) {
                        res.status(500).send({ msg: "Error saving user result" });
                        return;
                    }
                    console.log(savedResult);
                });
            }
        });
    });
});
}
