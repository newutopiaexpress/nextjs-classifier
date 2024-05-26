import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <div className="content-center justify-items-center min-h-screen">
  <div className="md:w-96 mx-auto">
      <SignUp />
  </div>
</div>
;
}