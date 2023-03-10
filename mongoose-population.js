const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/mongoose-population");

const reviewSchema = new Schema({
  reviewText: String,
  book: { type: Schema.Types.ObjectId, ref: "book" },
  critic: { type: Schema.Types.ObjectId, ref: "critic" },
});

const Review = mongoose.model("review", reviewSchema);

const criticSchema = new Schema({
  name: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
});

const Critic = mongoose.model("critic", criticSchema);

const bookSchema = new Schema({
  title: String,
  author: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
});

const Book = mongoose.model("book", bookSchema);

let critic1 = new Critic({
  name: "Critic 1",
  reviews: [],
});

let book1 = new Book({
  title: "Book 1",
  author: "Author 1",
  reviews: [],
});

let review = new Review({
  book: book1._id,
  critic: critic1._id,
  reviewText: "Excellent Book",
});

// review.save();

book1.reviews.push(review);
critic1.reviews.push(review);

// book1.save();
// critic1.save();

// Book.findOne({ title: "Book 1" })
//   .populate("reviews")
//   .exec((err, book) => {
//     console.log(book);
//   });

  // Critic.findOne({ name: 'Critic 1' })
  //   .populate('reviews')
  //   .exec((err, book) => {
  //     console.log(book);
  //   });

  // Book.findOne({ title: "Book 1" })
  // .populate("reviews")
  // .exec((err, book) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     console.log(book.reviews[0].critic);
  //   }
  // });

  // Book.findOne({ title: "Book 1" })
  // .populate({
  //   path: "reviews",
  //   populate: {
  //     path: "critic",
  //   },
  // })
  // .exec((err, book) => {
  //   console.log(err);
  //   console.log(book.reviews[0].critic);
  // });

  // Critic.findOne({ name: 'Critic 1' })
  // .populate({
  //   path: 'reviews',
  //   populate: {
  //     path: 'book',
  //   },
  // })
  // .exec((err, critic) => {
  //   console.log(err);
  //   console.log(critic.reviews[0].book);
  // });

  // Review.find({})
  // .populate("critic book")
  // .exec((err, review) => {
  //   console.log(review[0]);
  // });

  // Critic.findOne({ name: "Critic 1" })
  // .populate("reviews", "reviewText")
  // .exec((err, critic) => {
  //   console.log(critic.reviews);
  // });

  // Book.findOne({ title: 'Book 1'})
  // .populate('reviews', 'reviewText')
  // .exec((err, book) => {
  //   console.log(book.reviews);
  // })

  // Critic.findOne({ name: "Critic 1" })
  // .populate("reviews", "reviewText -_id")
  // .exec((err, critic) => {
  //   console.log(critic.reviews);
  // });

  // Critic.findOne({ name: "Critic 1" }, (err, critic) => {
  //   //now we have a single critic
  //   critic.populate("reviews", () => {
  //     console.log(critic.reviews);
  //   });
  // });

  Critic.find((err, critics) => {
    //now we have an array of critics
    Critic.populate(critics, { path: "reviews" }, (err, data) => {
      //now data is an array of populated critics
      console.log(data);
    });
  });