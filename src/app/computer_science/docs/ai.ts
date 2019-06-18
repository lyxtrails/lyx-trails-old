export const aiDoc = {
  homeHtml: `
    <p>Normal Distribution</p>
    <img src="assets/img/cs/equations/gaussian_dist_pdf.png" width="290" height="80"/>
    <p>$$f(x|\\mu,\\sigma^2)=\\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$</p>
    <p>Binomial Distribution</p>
    <img src="assets/img/cs/equations/binomial_dist_pdf.png" width="329" height="80"/>
    <p>$$f(k,n,p)={n \\choose k}p^k(1-p)^{n-k}$$</p>
    <p>Multinomial distribution</p>
    <img src="assets/img/cs/equations/multinomial_dist_pdf.png" width="556" height="80"/>
    <p>$$f(x_1,\\cdot\\cdot\\cdot,x_k;n,p_1,\\cdot\\cdot\\cdot,p_k)=\\frac{n!}{x_1!\\cdot\\cdot\\cdot x_k!}p_1^{x_1}\\cdot\\cdot\\cdot p_k^{x_k}$$</p>
    <p>Bernoulli Distribution</p>
    <img src="assets/img/cs/equations/bernoulli_dist_pdf.png" width="377" height="60"/>
    <p>$$f(k;p)=p^k(1-p)^{1-k} \\hspace{2mm} for \\hspace{2mm} k \\in \\{0,1\\}$$</p>
  `
};