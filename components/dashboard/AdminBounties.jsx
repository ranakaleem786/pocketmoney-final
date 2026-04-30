// "use client";

// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { api } from "@/lib/api";

// export default function AdminBounties() {
//   const [bounties, setBounties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🔥 FETCH BOUNTIES
//   const fetchBounties = async () => {
//     try {
//       const res = await api("/admin/get-all-admin-bounties-only");

//       if (res.success) {
//         setBounties(Array.isArray(res.data) ? res.data : []);
//       } else {
//         toast.error(res.message);
//         setBounties([]);
//       }
//     } catch (error) {
//       toast.error("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBounties();
//   }, []);

//   // 🗑 DELETE BOUNTY
//   const handleDelete = async (id) => {
//     if (!confirm("Are you sure you want to delete this bounty?")) return;

//     try {
//       const res = await api(`/admin/delete-bounty/${id}`, "DELETE");

//       if (res.success) {
//         toast.success("Bounty deleted");

//         setBounties((prev) => prev.filter((b) => b._id !== id));
//       } else {
//         toast.error(res.message);
//       }
//     } catch (error) {
//       toast.error("Server error");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-10 text-gray-500">
//         Loading bounties...
//       </div>
//     );
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold text-green-600 mb-5">
//         🧨 Admin Bounties
//       </h2>

//       {bounties.length === 0 ? (
//         <p className="text-gray-500">No bounties found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

//           {bounties.map((bounty) => (
//             <div
//               key={bounty._id}
//               className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-2"
//             >
//               <p>
//                 <span className="font-semibold">User:</span>{" "}
//                 {bounty.user?.userName}
//               </p>

//               <p>
//                 <span className="font-semibold">Role:</span>{" "}
//                 {bounty.user?.role}
//               </p>

//               <p>
//                 <span className="font-semibold">Red Code:</span>{" "}
//                 {bounty.redCode}
//               </p>

//               <p>
//                 <span className="font-semibold">Link:</span>{" "}
//                 {bounty.dailyBountyLink || "N/A"}
//               </p>

//               <p className="text-sm text-gray-500">
//                 Expires: {new Date(bounty.expireAt).toLocaleString()}
//               </p>

//               {/* DELETE BUTTON */}
//               <button
//                 onClick={() => handleDelete(bounty._id)}
//                 className="w-full cursor-pointer mt-2 py-1 bg-red-500 text-white rounded-lg text-sm"
//               >
//                 Delete Bounty
//               </button>
//             </div>
//           ))}

//         </div>
//       )}
//     </div>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

export default function AdminBounties() {
  const [bounties, setBounties] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✏️ EDIT STATE
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    redCode: "",
    dailyBountyLink: "",
    device: "",
    extendDays: "",
  });

  // ======================
  // FETCH BOUNTIES
  // ======================
  const fetchBounties = async () => {
    try {
      const res = await api("/admin/get-all-admin-bounties-only");

      if (res.success) {
        setBounties(Array.isArray(res.data) ? res.data : []);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBounties();
  }, []);

  // ======================
  // DELETE
  // ======================
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;

    try {
      const res = await api(`/admin/delete-bounty/${id}`, "DELETE");

      if (res.success) {
        toast.success("Deleted");
        setBounties((prev) => prev.filter((b) => b._id !== id));
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Server error");
    }
  };

  // ======================
  // OPEN EDIT MODAL
  // ======================
  const openEdit = (bounty) => {
    setEditItem(bounty);
    setForm({
      redCode: bounty.redCode || "",
      dailyBountyLink: bounty.dailyBountyLink || "",
      device: bounty.device || "",
      extendDays: "",
    });
  };

  // ======================
  // UPDATE BOUNTY
  // ======================
  const handleUpdate = async () => {
    try {
      const res = await api(
        `/admin/update-bounty/${editItem._id}`,
        "PUT",
        form
      );

      if (res.success) {
        toast.success("Updated");

        // UI update without refetch
        setBounties((prev) =>
          prev.map((b) =>
            b._id === editItem._id ? { ...b, ...form } : b
          )
        );

        setEditItem(null);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading bounties...
      </div>
    );
  }

  return (
    <div className="p-4">

      <h2 className="text-2xl font-bold text-green-600 mb-5">
        🧨 Admin Bounties
      </h2>

      {bounties.length === 0 ? (
        <p className="text-gray-500">No bounties found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {bounties.map((bounty) => (
            <div
              key={bounty._id}
              className="bg-white dark:bg-black/40 p-4 rounded-2xl shadow border space-y-2"
            >
              <p><b>User:</b> {bounty.user?.userName}</p>
              <p><b>Role:</b> {bounty.user?.role}</p>
              <p><b>Red Code:</b> {bounty.redCode}</p>
              <p><b>Link:</b> {bounty.dailyBountyLink || "N/A"}</p>
              <p><b>Device:</b> {bounty.device || "N/A"}</p>

              <p className="text-sm text-gray-500">
                Expires: {new Date(bounty.expireAt).toLocaleString()}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => openEdit(bounty)}
                  className="flex-1 py-1 bg-yellow-500 text-white rounded-lg text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(bounty._id)}
                  className="flex-1 py-1 bg-red-500 text-white rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

        </div>
      )}

      {/* ======================
          EDIT MODAL
      ====================== */}
      {editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg w-[350px] space-y-3">

            <h2 className="text-lg font-bold">Update Bounty</h2>

            <input
              className="border p-2 w-full"
              placeholder="Red Code"
              value={form.redCode}
              onChange={(e) =>
                setForm({ ...form, redCode: e.target.value })
              }
            />

            <input
              className="border p-2 w-full"
              placeholder="Link"
              value={form.dailyBountyLink}
              onChange={(e) =>
                setForm({ ...form, dailyBountyLink: e.target.value })
              }
            />

            <input
              className="border p-2 w-full"
              placeholder="Device"
              value={form.device}
              onChange={(e) =>
                setForm({ ...form, device: e.target.value })
              }
            />

            {/* ⏳ EXTEND DAYS */}
            <input
              type="number"
              className="border p-2 w-full"
              placeholder="Extend Days (e.g 2)"
              value={form.extendDays}
              onChange={(e) =>
                setForm({ ...form, extendDays: e.target.value })
              }
            />

            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-600 text-white py-1 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditItem(null)}
                className="flex-1 bg-gray-400 text-white py-1 rounded"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}