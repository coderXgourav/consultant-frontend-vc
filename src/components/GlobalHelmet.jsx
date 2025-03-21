import { Helmet } from "react-helmet";

const GlobalHelmet = () => {
  return (
    <Helmet>
      <script src="assets/js/jquery.min.js"></script>
      <script src="assets/vendor/apex/custom/home/available-beds.js"></script>
      <script src="assets/vendor/apex/custom/home/earnings.js"></script>
      <script src="assets/vendor/apex/custom/home/gender-age.js"></script>
      <script src="assets/vendor/apex/custom/home/claims.js"></script>

      <script src="assets/js/custom.js"></script>
    </Helmet>
  );
};

export default GlobalHelmet;
