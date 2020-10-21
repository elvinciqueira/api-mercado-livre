import Product from '../models/Products';
import imagesView from './images_views';

export default {
  render(product: Product) {
    return {
      id: product.id,
      name: product.name,
      characteristics: product.characteristics,
      description: product.characteristics.map(characteristic => characteristic.description),
      grade: product.opinion.map(opinion => opinion.grade).reduce((avg, value, _, { length }) => avg + value / length, 0),
      totalGrade: product.opinion.map(opinion => opinion.grade).reduce((grade, acc) => grade + acc, 0),
      opinions: product.opinion.map(opinion => opinion.description),
      questions: product.question.map(question => question.title),
      images: imagesView.renderMany(product.images)
    }
  },

  renderMany(products: Product[]) {
    return products.map(product => this.render(product))
  }
}
