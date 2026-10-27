import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Search,
  Factory,
  ClipboardCheck,
  CheckCircle2,
  RefreshCw,
  Plus,
  Trash2,
  X,
  Pencil,
} from 'lucide-react';

const API = 'http://127.0.0.1:8000/api';

const steps = [
  {
    label: 'Production Status',
    title: 'Regularly track the status of your production orders',
  },
  {
    label: 'Finished Good Costing',
    title: 'Track production costing and figure out ways to reduce it',
  },
  {
    label: 'Smart Features',
    title: "Reduce your Production Cost by up to 25% with TranZact's advanced features",
  },
];

const STATUSES = [
  'COMPLETED',
  'IN-TESTING',
  'WIP',
  'PENDING',
  'PLANNED',
];

const statusClass = (status) =>
  (status || '').toLowerCase().replaceAll(' ', '-');

// const emptyForm = {
//   fg_name: '',
//   target_qty: 1,
//   completed_qty: 0,
//   status: 'PLANNED',
//   process_code: 'PID0001',
//   process_name: 'Production Process',
//   product_name: 'New Product',
//   total_cost: '0.00',
//   cost_quantity: 1,
// };
const emptyForm = {
  fg_name: '',
  target_qty: 1,
  completed_qty: 0,
  status: 'PLANNED',
  process_code: 'PID0001',
  process_name: 'Production Process',
  product_name: 'New Product',

  material_cost: '0.00',
  labour_cost: '0.00',
  machine_cost: '0.00',
  other_cost: '0.00',

  total_cost: '0.00',
  cost_quantity: 1,
};

export default function App() {
  const [step, setStep] = useState(0);
  const [orders, setOrders] = useState([]);
  const [selectedRole, setSelectedRole] = useState('Admin');
  const [features, setFeatures] = useState([]);
  const [plans, setPlans] = useState([]);
  const [qualityOrder, setQualityOrder] = useState(null);
const [qualityNotes, setQualityNotes] = useState('');
const [qualityStatus, setQualityStatus] = useState('PENDING');
const [qualityMessage, setQualityMessage] = useState('');
  
  // Multi-level BOM state
const [bomItems, setBomItems] = useState([]);
const [bomOrder, setBomOrder] = useState('');
const [bomComponent, setBomComponent] = useState('');
const [bomQuantity, setBomQuantity] = useState('1');
const [bomUnit, setBomUnit] = useState('pcs');
const [bomParent, setBomParent] = useState('');
const [bomMessage, setBomMessage] = useState('');
const [bomSaving, setBomSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL');
  const [selected, setSelected] = useState(null);
  const [activeFeature, setActiveFeature] = useState(null);
const [planOrder, setPlanOrder] = useState('');
const [planDate, setPlanDate] = useState('');
const [planMessage, setPlanMessage] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

//   // Load production orders and smart features from Django.
//   async function load() {
//   try {
//     // const [ordersResponse, featuresResponse, plansResponse] =
//     //   await Promise.all([
//     //     fetch(`${API}/orders/`),
//     //     fetch(`${API}/features/`),
//     //     fetch(`${API}/plans/`),
//     //   ]);
//     const [
//   ordersResponse,
//   featuresResponse,
//   plansResponse,
//   bomResponse,
// ] = await Promise.all([
//   fetch(`${API}/orders/`),
//   fetch(`${API}/features/`),
//   fetch(`${API}/plans/`),
//   fetch(`${API}/bom-items/`),
// ]);

// //       if (
// //   !ordersResponse.ok ||
// //   !featuresResponse.ok ||
// //   !plansResponse.ok
// // ) {

// // if (
// //   !ordersResponse.ok ||
// //   !featuresResponse.ok ||
// //   !plansResponse.ok ||
// //   !bomResponse.ok
// // ) {
// //   throw new Error(
// //     'Unable to load data. Please check your Django backend.'
// //   );
// // }
// //         throw new Error(
// //           'Unable to load data. Please check your Django backend.'
// //         );
// //       }

// // Load production orders, smart features, plans and BOM items.
// async function load() {
//   try {
//     const [
//       ordersResponse,
//       featuresResponse,
//       plansResponse,
//       bomResponse,
//     ] = await Promise.all([
//       fetch(`${API}/orders/`),
//       fetch(`${API}/features/`),
//       fetch(`${API}/plans/`),
//       fetch(`${API}/bom-items/`),
//     ]);

//     // Check whether the backend returned successful responses.
//     if (
//       !ordersResponse.ok ||
//       !featuresResponse.ok ||
//       !plansResponse.ok ||
//       !bomResponse.ok
//     ) {
//       throw new Error(
//         'Unable to load data. Please check your Django backend.'
//       );
//     }

//     // Convert API responses into JavaScript data.
//     const orderData = await ordersResponse.json();
//     const featureData = await featuresResponse.json();
//     const planData = await plansResponse.json();
//     const bomData = await bomResponse.json();

//     // Update the React state.
//     setOrders(orderData);
//     setFeatures(featureData);
//     setPlans(planData);
//     setBomItems(bomData);

//     // Keep the selected costing order updated.
//     setSelected((previous) => {
//       if (!previous) return null;

//       return (
//         orderData.find(
//           (order) => order.id === previous.id
//         ) || null
//       );
//     });

//     setError('');
//   } catch (err) {
//     console.error('REAL ERROR:', err);

//     setError(
//       `Error: ${err.message}. Please check the browser console.`
//     );
//   }
// }

// const orderData = await ordersResponse.json();
// const featureData = await featuresResponse.json();
// const planData = await plansResponse.json();
// const bomData = await bomResponse.json();

// setOrders(orderData);
// setFeatures(featureData);
// setPlans(planData);
// setBomItems(bomData);
//       // Keep the selected costing order updated.
//       setSelected((previous) => {
//         if (!previous) return null;

//         return (
//           orderData.find((order) => order.id === previous.id) || null
//         );
//       });

//       setError('');
//     // } catch {
//     //   setError(
//     //     'Cannot connect to Django. Make sure the backend is running on port 8000.'
//     //   );
//     // }
//     } catch (err) {
//   console.error('REAL ERROR:', err);

//   setError(
//     `Error: ${err.message}. Please check the browser console.`
//   );
// }
//   }


// Load production orders, smart features, plans and BOM items.
async function load() {
  try {
    const [
      ordersResponse,
      featuresResponse,
      plansResponse,
      bomResponse,
    ] = await Promise.all([
      fetch(`${API}/orders/`),
      fetch(`${API}/features/`),
      fetch(`${API}/plans/`),
      fetch(`${API}/bom-items/`),
    ]);

    if (
      !ordersResponse.ok ||
      !featuresResponse.ok ||
      !plansResponse.ok ||
      !bomResponse.ok
    ) {
      throw new Error(
        'Unable to load data. Please check your Django backend.'
      );
    }

    const orderData = await ordersResponse.json();
    const featureData = await featuresResponse.json();
    const planData = await plansResponse.json();
    const bomData = await bomResponse.json();

    setOrders(orderData);
    setFeatures(featureData);
    setPlans(planData);
    setBomItems(bomData);

    setSelected((previous) => {
      if (!previous) return null;

      return (
        orderData.find(
          (order) => order.id === previous.id
        ) || null
      );
    });

    setError('');
  } catch (err) {
    console.error('REAL ERROR:', err);

    setError(
      `Error: ${err.message}. Please check the browser console.`
    );
  }
}



  useEffect(() => {
    load();
  }, []);

  // Search and filter production orders.
  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = (order.fg_name || '')
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        filter === 'ALL' || order.status === filter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, filter]);

  // Open a blank form to add a new order.
  function openAddForm() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setSuccess('');
    setShowForm(true);
  }

  // Open the form with an existing order's details.
  function openEditForm(order) {
    setEditingId(order.id);

    setForm({
      fg_name: order.fg_name || '',
      target_qty: order.target_qty ?? 0,
      completed_qty: order.completed_qty ?? 0,
      status: order.status || 'PLANNED',
      process_code: order.process_code || 'PID0001',
      process_name: order.process_name || 'Production Process',
      // product_name: order.product_name || order.fg_name || '',
      // total_cost: order.total_cost ?? '0.00',
      // cost_quantity: order.cost_quantity ?? 1,
      product_name: order.product_name || order.fg_name || '',

material_cost: order.material_cost ?? '0.00',
labour_cost: order.labour_cost ?? '0.00',
machine_cost: order.machine_cost ?? '0.00',
other_cost: order.other_cost ?? '0.00',

total_cost: order.total_cost ?? '0.00',
cost_quantity: order.cost_quantity ?? 1,
    });

    setError('');
    setSuccess('');
    setShowForm(true);
  }

  // Add a new order or update an existing order.
  async function saveOrder(event) {
    event.preventDefault();

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const target = Number(form.target_qty);
      const completed = Number(form.completed_qty);
      const costQuantity = Number(form.cost_quantity);
      // const totalCost = Number(form.total_cost);
      const materialCost = Number(form.material_cost) || 0;
const labourCost = Number(form.labour_cost) || 0;
const machineCost = Number(form.machine_cost) || 0;
const otherCost = Number(form.other_cost) || 0;

const totalCost =
  materialCost +
  labourCost +
  machineCost +
  otherCost;

      // if (
      //   target < 0 ||
      //   completed < 0 ||
      //   costQuantity < 1 ||
      //   totalCost < 0
      // ) {
      //   throw new Error('Please enter valid quantities and costs.');
      // }

      if (
  target < 0 ||
  completed < 0 ||
  costQuantity < 1 ||
  materialCost < 0 ||
  labourCost < 0 ||
  machineCost < 0 ||
  otherCost < 0
) {
  throw new Error('Please enter valid quantities and costs.');
}

      if (completed > target) {
        throw new Error(
          'Completed quantity cannot be greater than target quantity.'
        );
      }

      // const data = {
      //   ...form,
      //   target_qty: target,
      //   completed_qty: completed,
      //   cost_quantity: costQuantity,
      //   total_cost: totalCost.toFixed(2),
      // };
      const data = {
  ...form,

  target_qty: target,
  completed_qty: completed,
  cost_quantity: costQuantity,

  material_cost: materialCost.toFixed(2),
  labour_cost: labourCost.toFixed(2),
  machine_cost: machineCost.toFixed(2),
  other_cost: otherCost.toFixed(2),

  total_cost: totalCost.toFixed(2),
};

      const isEditing = editingId !== null;

      const url = isEditing
        ? `${API}/orders/${editingId}/`
        : `${API}/orders/`;

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const details = await response.json().catch(() => null);

        const message =
          details && typeof details === 'object'
            ? Object.entries(details)
                .map(([key, value]) => {
                  const text = Array.isArray(value)
                    ? value.join(', ')
                    : typeof value === 'string'
                      ? value
                      : JSON.stringify(value);

                  return `${key}: ${text}`;
                })
                .join(' | ')
            : 'Please check the entered information.';

        throw new Error(message || 'Could not save the order.');
      }

      setShowForm(false);
      setEditingId(null);
      setForm({ ...emptyForm });

      await load();

      setSuccess(
        isEditing
          ? 'Production order updated successfully!'
          : 'Production order added successfully!'
      );
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSaving(false);
    }
  }

  // Delete an order from the Django database.
  async function deleteOrder(order) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${order.fg_name}"?`
    );

    if (!confirmed) return;

    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API}/orders/${order.id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Unable to delete this production order.');
      }

      if (selected?.id === order.id) {
        setSelected(null);
      }

      await load();

      setSuccess(
        `"${order.fg_name}" was deleted successfully.`
      );
    } catch (err) {
      setError(err.message || 'Could not delete the order.');
    }
  }

  const activeOrder =
    orders.find((order) => order.id === selected?.id) || orders[0] || null;
    // Production Cost Comparison - Top 5 Orders
const costComparisonOrders = [...orders]
  .sort(
    (a, b) =>
      (Number(b.total_cost) || 0) -
      (Number(a.total_cost) || 0)
  )
  .slice(0, 5);

const highestComparisonCost = Math.max(
  1,
  ...costComparisonOrders.map(
    (order) => Number(order.total_cost) || 0
  )
);
    const calculatedTotalCost =
  (Number(form.material_cost) || 0) +
  (Number(form.labour_cost) || 0) +
  (Number(form.machine_cost) || 0) +
  (Number(form.other_cost) || 0);

const calculatedCostPerUnit =
  Number(form.cost_quantity) > 0
    ? calculatedTotalCost / Number(form.cost_quantity)
    : 0;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-mark">
          <Factory size={23} />
        </div>

        <div>
          <div className="brand">
            TranZact <span>Product Tour</span>
          </div>
          <div className="brand-sub">
            Production management demo
          </div>
        </div>

        <div className="top-right">
          <span className="live-dot"></span>
          Interactive demo

          <button
            className="icon-button"
            title="Refresh data"
            onClick={load}
          >
            <RefreshCw size={17} />
          </button>
        </div>
      </header>

      <main className="main">
        <div className="intro">
          <div className="eyebrow">
            PRODUCT TOUR · {String(step + 1).padStart(2, '0')} / 03
          </div>

          <h1>{steps[step].title}</h1>

          <p>
            Explore production tracking, finished good costing,
            and smart manufacturing features.
          </p>
        </div>

        {error && (
          <div className="error-banner">
            {error}
          </div>
        )}

        {success && (
          <div className="success-banner">
            {success}
          </div>
        )}

        <section className="demo-panel">
          {/* PAGE 1: PRODUCTION STATUS */}
          {step === 0 && (
            <div className="status-view">
              <div className="panel-head">
                <div>
                  <h2>Production orders</h2>
                  <p>
                    Monitor target quantity, completed quantity
                    and status.
                  </p>
                </div>

                <button
                  className="primary-btn"
                  onClick={openAddForm}
                >
                  <Plus size={17} />
                  Add order
                </button>
              </div>

              <div className="toolbar">
                <label className="searchbox">
                  <Search size={17} />

                  <input
                    placeholder="Search finished goods..."
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                  />
                </label>

                <select
                  value={filter}
                  onChange={(event) =>
                    setFilter(event.target.value)
                  }
                >
                  <option value="ALL">All statuses</option>

                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>FG NAME</th>
                      <th>TARGET QTY.</th>
                      <th>COMPLETED QTY.</th>
                      <th>STATUS</th>
                      <th>COST</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>

                  <tbody>
                    {filtered.map((order) => (
                      <tr key={order.id}>
                        <td className="fg-name">
                          {order.fg_name}
                        </td>

                        <td>
                          {Number(order.target_qty).toLocaleString()}
                        </td>

                        <td>
                          {Number(order.completed_qty).toLocaleString()}
                        </td>

                        <td>
                          <span
                            className={`status-pill ${statusClass(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </span>
                        </td>

                        <td>
                          ₹
                          {Number(
                            order.total_cost || 0
                          ).toLocaleString('en-IN', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>

                        <td>
                          <div className="action-buttons">
                            <button
                              className="text-btn"
                              onClick={() => {
                                setSelected(order);
                                setStep(1);
                              }}
                            >
                              View cost
                            </button>

                            <button
                              className="edit-btn"
                              title="Edit order"
                              onClick={() => openEditForm(order)}
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              className="delete-btn"
                              title="Delete order"
                              onClick={() => deleteOrder(order)}
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {!filtered.length && (
                      <tr>
                        <td colSpan="6" className="empty">
                          No orders match your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="table-foot">
                <span>
                  Showing {filtered.length} of {orders.length} orders
                </span>

                <span>Data stored in Django · SQLite</span>
              </div>
            </div>
          )}

          {/* PAGE 2: FINISHED GOOD COSTING */}
          {step === 1 && (
            <div className="cost-view">
              {activeOrder ? (
                <>
                  <div className="cost-head">
                    <div className="cost-icon">
                      <ClipboardCheck size={26} />
                    </div>

                    <div>
                      <div className="eyebrow">
                        FINISHED GOOD COSTING
                      </div>

                      <h2>{activeOrder.process_code}</h2>

                      <p>
                        {activeOrder.process_name}
                        <br />
                        For {activeOrder.product_name}
                      </p>
                    </div>

                    <span
                      className={`status-pill ${statusClass(
                        activeOrder.status
                      )}`}
                    >
                      {activeOrder.status}
                    </span>
                  </div>

                  <div className="cost-total">
                    <span>Total Cost</span>

                    <strong>
                      ₹
                      {Number(
                        activeOrder.total_cost || 0
                      ).toLocaleString('en-IN', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </strong>

                    <small>
                      for {activeOrder.cost_quantity} pcs
                    </small>
                  </div>
                  {/* COST BREAKDOWN */}
<div className="cost-breakdown">
  <div className="cost-breakdown-header">
    <div>
      <h3>Production Cost Breakdown</h3>
      <p>Detailed expenses for this finished good</p>
    </div>
    <span className="cost-label">INR (₹)</span>
  </div>

  <div className="cost-row">
    <span>Material Cost</span>
    <strong>
      ₹{Number(activeOrder.material_cost || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </strong>
  </div>

  <div className="cost-row">
    <span>Labour Cost</span>
    <strong>
      ₹{Number(activeOrder.labour_cost || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </strong>
  </div>

  <div className="cost-row">
    <span>Machine Cost</span>
    <strong>
      ₹{Number(activeOrder.machine_cost || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </strong>
  </div>

  <div className="cost-row">
    <span>Other Expenses</span>
    <strong>
      ₹{Number(activeOrder.other_cost || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </strong>
  </div>

  <div className="cost-row cost-row-total">
    <span>Total Production Cost</span>
    <strong>
      ₹{Number(activeOrder.total_cost || 0).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}
    </strong>
  </div>

  <div className="cost-row cost-row-unit">
    <span>Cost Per Unit</span>
    <strong>
      ₹{Number(activeOrder.cost_quantity) > 0
        ? (
            Number(activeOrder.total_cost || 0) /
            Number(activeOrder.cost_quantity)
          ).toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })
        : '0.00'}
    </strong>
  </div>
</div>
{/* PRODUCTION COST COMPARISON CHART */}
<div className="cost-comparison-card">

  <div className="cost-comparison-header">
    <div>
      <h3>Production Cost Comparison</h3>
      <p>Compare production costs across your top 5 orders.</p>
    </div>

    <span className="cost-label">INR (₹)</span>
  </div>

  {costComparisonOrders.length > 0 ? (
    costComparisonOrders.map((order) => {
      const orderCost = Number(order.total_cost) || 0;

      const barWidth =
        (orderCost / highestComparisonCost) * 100;

      return (
        <div className="comparison-item" key={order.id}>

          <div className="comparison-label">
            <span>
              {order.fg_name ||
                order.product_name ||
                `Order #${order.id}`}
            </span>

            <strong>
              ₹
              {orderCost.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </strong>
          </div>

          <div className="comparison-bar-track">
            <div
              className="comparison-bar"
              style={{ width: `${barWidth}%` }}
            />
          </div>

        </div>
      );
    })
  ) : (
    <p>No production orders available yet.</p>
  )}

</div>

                  <div className="cost-details">
                    <div>
                      <span>Finished good</span>
                      <b>{activeOrder.fg_name}</b>
                    </div>

                    <div>
                      <span>Target quantity</span>
                      <b>{activeOrder.target_qty}</b>
                    </div>

                    <div>
                      <span>Completed quantity</span>
                      <b>{activeOrder.completed_qty}</b>
                    </div>
                  </div>

                  <p className="helper-note">
                    These costs come from the production order
                    stored in your Django database.
                  </p>

                  <button
                    className="outline-btn"
                    onClick={() => setStep(0)}
                  >
                    <ArrowLeft size={16} />
                    Back to production status
                  </button>
                </>
              ) : (
                <div className="empty">
                  No production orders available.
                  <br />
                  Add a production order to view its costing.
                </div>
              )}
            </div>
          )}

          {/* PAGE 3: SMART FEATURES */}
          {step === 2 && (
            <div className="features-view">
              <div className="feature-summary">
                <div className="feature-badge">
                  <CheckCircle2 size={18} />
                  Smart manufacturing
                </div>

                <h2>Smarter tools. Better production.</h2>

                <p>
                  Explore the four advanced features shown in
                  the supplied product tour.
                </p>
              </div>

              <div className="feature-grid">
                {(
                  features.length
                    ? features
                    : [
                        {
                          title: 'Smart Planning',
                          description:
                            'Plan production schedules and track progress.',
                          icon: '🗓️',
                        },
                        {
                          title: 'Multi-level BOM',
                          description:
                            'Organise components across multiple bill-of-material levels.',
                          icon: '🧩',
                        },
                        {
                          title: 'Role-wise access',
                          description:
                            'Give each role access to the tools it needs.',
                          icon: '👥',
                        },
                        {
                          title: 'Quality Approval',
                          description:
                            'Review quality checks before a product is approved.',
                          icon: '✅',
                        },
                      ]
                ).map((feature, index) => (
                <article
  className={`feature-card ${
    activeFeature === feature.title ? 'feature-card-active' : ''
  }`}
  key={feature.id || feature.title}
  onClick={() => {
    setActiveFeature(feature.title);
    setPlanMessage('');
  }}
  style={{ cursor: 'pointer' }}
>
                    <div className={`feature-icon fi-${index}`}>
                      {feature.icon || '✨'}
                    </div>

                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </article>
                ))}
              </div>
              {activeFeature && (
  <div className="planning-panel">
    <h2>{activeFeature}</h2>

    {activeFeature === 'Smart Planning' ? (
      <>
        <p>Plan your production schedule and track progress.</p>

    
<form
  onSubmit={async (event) => {
    event.preventDefault();

    if (!planOrder || !planDate) {
      setPlanMessage('Please select an order and planned date.');
      return;
    }

    try {
      setPlanMessage('Saving your plan...');

      const selectedOrder = orders.find(
        (order) => String(order.id) === String(planOrder)
      );

      const response = await fetch(`${API}/plans/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: Number(planOrder),
          planned_date: planDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      setPlanMessage(
        `Success! Your plan for ${selectedOrder?.fg_name || 'the selected order'} on ${planDate} has been saved.`
      );
      const updatedPlans = await fetch(`${API}/plans/`);
const updatedPlanData = await updatedPlans.json();
setPlans(updatedPlanData);
    } catch (error) {
      console.error(error);
      setPlanMessage(`Could not save the plan: ${error.message}`);
    }
  }}
>

          <label>
            Select Production Order
            <select
              value={planOrder}
              onChange={(event) => setPlanOrder(event.target.value)}
              required
            >
              <option value="">Choose an order</option>

              {orders.map((order) => (
             
<option key={order.id} value={order.id}>
  {order.fg_name}
</option>


              ))}
            </select>
          </label>

          <label>
            Planned Production Date
            <input
              type="date"
              value={planDate}
              onChange={(event) => setPlanDate(event.target.value)}
              required
            />
          </label>

          <button type="submit" className="primary-btn">
            Create Plan
          </button>

          {planMessage && <p>{planMessage}</p>}
        </form>
        
<div className="saved-plans">
  <h3>Saved Production Plans</h3>

  {plans.length === 0 ? (
    <p>No plans saved yet. Create your first production plan above.</p>
  ) : (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Production Order</th>
            <th>Planned Date</th>
          </tr>
        </thead>

        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td>{plan.order_name}</td>
              <td>{plan.planned_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>


      </>
) : activeFeature === 'Multi-level BOM' ? (
  <>
    <p>
      Create and manage components for each production order.
      Add parent components and subcomponents to build a
      multi-level Bill of Materials.
    </p>

    <form
      onSubmit={async (event) => {
        event.preventDefault();

        if (!bomOrder || !bomComponent.trim()) {
          setBomMessage(
            'Please select a production order and enter a component name.'
          );
          return;
        }

        setBomSaving(true);
        setBomMessage('Saving component...');

        try {
          const payload = {
            order: Number(bomOrder),
            component_name: bomComponent.trim(),
            quantity: Number(bomQuantity),
            unit: bomUnit,
            parent_item: bomParent
              ? Number(bomParent)
              : null,
          };

          const response = await fetch(`${API}/bom-items/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(JSON.stringify(data));
          }

          setBomComponent('');
          setBomQuantity('1');
          setBomParent('');

          const refreshed = await fetch(`${API}/bom-items/`);

          if (!refreshed.ok) {
            throw new Error('Component saved, but refreshing the list failed.');
          }

          setBomItems(await refreshed.json());

          setBomMessage('Component saved successfully!');
        } catch (err) {
          console.error('BOM save error:', err);

          setBomMessage(
            `Could not save component: ${err.message}`
          );
        } finally {
          setBomSaving(false);
        }
      }}
      className="form-grid"
    >
      <label>
        Production Order

        <select
          value={bomOrder}
          onChange={(event) => {
            setBomOrder(event.target.value);
            setBomParent('');
          }}
          required
        >
          <option value="">Select production order</option>

          {orders.map((order) => (
            <option key={order.id} value={order.id}>
              {order.fg_name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Component Name

        <input
          type="text"
          value={bomComponent}
          onChange={(event) =>
            setBomComponent(event.target.value)
          }
          placeholder="e.g. Valve Body"
          required
        />
      </label>

      <label>
        Quantity

        <input
          type="number"
          min="0.01"
          step="0.01"
          value={bomQuantity}
          onChange={(event) =>
            setBomQuantity(event.target.value)
          }
          required
        />
      </label>

      <label>
        Unit

        <select
          value={bomUnit}
          onChange={(event) =>
            setBomUnit(event.target.value)
          }
        >
          <option value="pcs">Pieces (pcs)</option>
          <option value="kg">Kilograms (kg)</option>
          <option value="g">Grams (g)</option>
          <option value="litres">Litres</option>
          <option value="metres">Metres</option>
        </select>
      </label>

      <label>
        Parent Component

        <select
          value={bomParent}
          onChange={(event) =>
            setBomParent(event.target.value)
          }
        >
          <option value="">None — Top-level component</option>

          {bomItems
            .filter(
              (item) =>
                String(item.order) === String(bomOrder)
            )
            .map((item) => (
              <option key={item.id} value={item.id}>
                {'Level ' + item.component_level + ' — '}
                {item.component_name}
              </option>
            ))}
        </select>
      </label>

      <div className="form-actions">
        <button
          type="submit"
          className="primary-btn"
          disabled={bomSaving}
        >
          {bomSaving ? 'Saving...' : 'Add Component'}
        </button>
      </div>

      {bomMessage && (
        <p role="status">{bomMessage}</p>
      )}
    </form>

    <div className="saved-plans">
      <h3>Bill of Materials Components</h3>

      {!bomOrder ? (
        <p>Select a production order to manage its components.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>LEVEL</th>
                <th>COMPONENT</th>
                <th>QUANTITY</th>
                <th>PARENT</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {bomItems
                .filter(
                  (item) =>
                    String(item.order) === String(bomOrder)
                )
                .map((item) => (
                  <tr key={item.id}>
                    <td>Level {item.component_level}</td>

                    <td>{item.component_name}</td>

                    <td>
                      {item.quantity} {item.unit}
                    </td>

                    <td>
                      {bomItems.find(
                        (parent) =>
                          parent.id === item.parent_item
                      )?.component_name || '—'}
                    </td>

                    <td>
                      <button
                        type="button"
                        className="delete-btn"
                        onClick={async () => {
                          const confirmed = window.confirm(
                            `Delete ${item.component_name} and its subcomponents?`
                          );

                          if (!confirmed) return;

                          try {
                            const response = await fetch(
                              `${API}/bom-items/${item.id}/`,
                              { method: 'DELETE' }
                            );

                            if (!response.ok) {
                              throw new Error(
                                'Could not delete this component.'
                              );
                            }

                            const refreshed = await fetch(
                              `${API}/bom-items/`
                            );

                            if (!refreshed.ok) {
                              throw new Error(
                                'Component deleted, but refreshing failed.'
                              );
                            }

                            setBomItems(await refreshed.json());

                            setBomMessage(
                              'Component deleted successfully.'
                            );
                          } catch (err) {
                            setBomMessage(err.message);
                          }
                        }}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

              {!bomItems.some(
                (item) =>
                  String(item.order) === String(bomOrder)
              ) && (
                <tr>
                  <td colSpan="5">
                    No components added for this order yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </>
// ) : activeFeature === 'Quality Approval' ? (
      
      
  
//   <p>
//     Quality Approval — This feature is available as a
//     demonstration in the Product Tour.
//   </p>
// ) : (
) : activeFeature === 'Role-wise access' ? (
  <div className="planning-panel">
    <h3>Role-wise Access Management</h3>

    <p>
      Select a role to view its permissions.
    </p>

    <label>
      Select Role
      <select
        value={selectedRole}
        onChange={(event) => setSelectedRole(event.target.value)}
      >
        <option value="Admin">Admin</option>
        <option value="Production Manager">Production Manager</option>
        <option value="Quality Inspector">Quality Inspector</option>
        <option value="Viewer">Viewer</option>
      </select>
    </label>

    <h3>Permissions</h3>

    <ul>
      {(
        selectedRole === 'Admin'
          ? ['Dashboard', 'Production Orders', 'Costing', 'Planning', 'Quality Approval']
          : selectedRole === 'Production Manager'
          ? ['Dashboard', 'Production Orders', 'Costing', 'Planning']
          : selectedRole === 'Quality Inspector'
          ? ['Dashboard', 'Quality Approval']
          : ['Dashboard']
      ).map((permission) => (
        <li key={permission}>{permission} — Allowed</li>
      ))}
    </ul>

    <p>
      Selected role: <strong>{selectedRole}</strong>
    </p>
  </div>

) : activeFeature === 'Quality Approval' ? (
<> <p>
Review production orders and approve or reject them
after quality inspection. </p>


<div className="saved-plans">
  <h3>Quality Inspection</h3>

  {orders.length === 0 ? (
    <p>No production orders available. Add an order first.</p>
  ) : (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>PRODUCTION ORDER</th>
            <th>QUANTITY</th>
            <th>PRODUCTION STATUS</th>
            <th>QUALITY ACTION</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.fg_name}</td>
              <td>{order.completed_qty} / {order.target_qty}</td>
              <td>{order.status}</td>
              <td>
                <button
                  type="button"
                  className="primary-btn"
                  onClick={() => {
                    setQualityOrder(order);
                    setQualityNotes('');
                    setQualityMessage('');
                  }}
                >
                  Inspect
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {qualityOrder && (
    <form
      className="form-grid"
      onSubmit={async (event) => {
        event.preventDefault();

        if (!qualityNotes.trim()) {
          setQualityMessage('Please enter inspection notes.');
          return;
        }

        try {
          const response = await fetch(
            `${API}/quality-approvals/`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                order: qualityOrder.id,
                inspection_notes: qualityNotes.trim(),
                status: qualityStatus,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(JSON.stringify(data));
          }

          setQualityMessage('Quality inspection saved successfully!');
          setQualityNotes('');
          setQualityOrder(null);
          await load();
        } catch (error) {
          setQualityMessage(
            `Could not save inspection: ${error.message}`
          );
        }
      }}
    >
      <h3>Inspect: {qualityOrder.fg_name}</h3>

      <label>
        Inspection Notes
        <textarea
          value={qualityNotes}
          onChange={(event) => setQualityNotes(event.target.value)}
          placeholder="Enter quality inspection results"
          required
        />
      </label>

      <label>
        Inspection Decision
        <select
          value={qualityStatus}
          onChange={(event) => setQualityStatus(event.target.value)}
        >
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </label>

      <div className="form-actions">
        <button type="submit" className="primary-btn">
          Save Inspection
        </button>

        <button
          type="button"
          className="outline-btn"
          onClick={() => setQualityOrder(null)}
        >
          Cancel
        </button>
      </div>
    </form>
  )}

  {qualityMessage && (
    <p role="status">{qualityMessage}</p>
  )}
</div>


</>
) : (

  <p>
    {activeFeature} — This feature is available as a demonstration
    in the Product Tour.
  </p>
)}

    <button
      className="outline-btn"
      onClick={() => setActiveFeature(null)}
    >
      Close
    </button>
  </div>
)}

              <div className="feature-disclaimer">
                Feature descriptions are a student-project
                demonstration based on the PDF slides.
              </div>
            </div>
          )}
        </section>

        {/* PAGE NAVIGATION */}
        <div className="tour-footer">
          <button
            className="outline-btn"
            onClick={() =>
              setStep((current) => Math.max(0, current - 1))
            }
            disabled={step === 0}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="stepper">
            {steps.map((item, index) => (
              <button
                key={item.label}
                onClick={() => setStep(index)}
                className={`step ${
                  step === index
                    ? 'current'
                    : step > index
                      ? 'done'
                      : ''
                }`}
              >
                <span className="step-number">
                  {step > index ? '✓' : index + 1}
                </span>

                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            className="primary-btn next-btn"
            onClick={() =>
              setStep((current) => (current === 2 ? 0 : current + 1))
            }
          >
            {step === 2 ? 'Start again' : 'Next'}
            <ArrowRight size={17} />
          </button>
        </div>
      </main>

      <footer className="site-footer">
        Made for an educational project
        <span>•</span>
        Django + React
        <span>•</span>
        Pages 6–8
      </footer>

      {/* ADD / EDIT ORDER FORM */}
      {showForm && (
        <div
          className="modal-backdrop"
          onClick={() => setShowForm(false)}
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-title">
              <div>
                <h2>
                  {editingId !== null
                    ? 'Edit production order'
                    : 'Add production order'}
                </h2>

                <p>
                  {editingId !== null
                    ? 'Update the production order details.'
                    : 'Create a record saved by Django.'}
                </p>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowForm(false)}
                type="button"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={saveOrder} className="form-grid">
              <label>
                Finished good name
                <input
                  required
                  value={form.fg_name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      fg_name: event.target.value,
                    })
                  }
                  placeholder="e.g. Valve Assembly"
                />
              </label>

              <label>
                Target quantity
                <input
                  required
                  type="number"
                  min="0"
                  value={form.target_qty}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      target_qty: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Completed quantity
                <input
                  required
                  type="number"
                  min="0"
                  value={form.completed_qty}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      completed_qty: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Status
                <select
                  value={form.status}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      status: event.target.value,
                    })
                  }
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Process code
                <input
                  required
                  value={form.process_code}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      process_code: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Process name
                <input
                  required
                  value={form.process_name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      process_name: event.target.value,
                    })
                  }
                />
              </label>

              <label>
                Product name
                <input
                  required
                  value={form.product_name}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      product_name: event.target.value,
                    })
                  }
                />
              </label>

              {/* <label>
                Total cost (₹)
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.total_cost}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      total_cost: event.target.value,
                    })
                  }
                />
              </label> */}

              <label>
  Material Cost (₹)
  <input
    type="number"
    min="0"
    step="0.01"
    value={form.material_cost}
    onChange={(event) =>
      setForm({
        ...form,
        material_cost: event.target.value,
      })
    }
  />
</label>

<label>
  Labour Cost (₹)
  <input
    type="number"
    min="0"
    step="0.01"
    value={form.labour_cost}
    onChange={(event) =>
      setForm({
        ...form,
        labour_cost: event.target.value,
      })
    }
  />
</label>

<label>
  Machine Cost (₹)
  <input
    type="number"
    min="0"
    step="0.01"
    value={form.machine_cost}
    onChange={(event) =>
      setForm({
        ...form,
        machine_cost: event.target.value,
      })
    }
  />
</label>

<label>
  Other Expenses (₹)
  <input
    type="number"
    min="0"
    step="0.01"
    value={form.other_cost}
    onChange={(event) =>
      setForm({
        ...form,
        other_cost: event.target.value,
      })
    }
  />
</label>

<div className="cost-calculation">
  <div>
    <span>Total Production Cost</span>
    <strong>
      ₹
      {calculatedTotalCost.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </strong>
  </div>

  <div>
    <span>Cost Per Unit</span>
    <strong>
      ₹
      {calculatedCostPerUnit.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
    </strong>
  </div>
</div>

              <label>
                Cost quantity
                <input
                  required
                  type="number"
                  min="1"
                  value={form.cost_quantity}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      cost_quantity: event.target.value,
                    })
                  }
                />
              </label>

              <div className="form-actions">
                <button
                  type="button"
                  className="outline-btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button
                  className="primary-btn"
                  type="submit"
                  disabled={saving}
                >
                  {saving
                    ? 'Saving...'
                    : editingId !== null
                      ? 'Update order'
                      : 'Save order'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}