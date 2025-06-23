import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { getUserProfileThunk } from "./store/slice/user/userThunk";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      dispatch(getUserProfileThunk());
    })();
  }, [isAuthenticated]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
