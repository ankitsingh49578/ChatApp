import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";
import { getUserProfileThunk } from "./store/slice/user/userThunk";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(getUserProfileThunk());
    })();
  }, []);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
